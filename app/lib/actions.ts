'use server';
import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
// 使用Zod，一个 TypeScript 优先的验证库，可以为您简化此任务
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string()
})

const CreateInvoice = FormSchema.omit({ id: true, date: true });
export async function createInvoice(formData: FormData) {
    console.log('formData', formData);
    const {customerId, amount, status} = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100; // 将金额转换为美分
    const date = new Date().toISOString().split('T')[0]; // 获取当前日期
    // 插入数据库
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    // 一旦数据库更新，/dashboard/invoices路径将重新验证，并从服务器获取新数据
    revalidatePath('/dashboard/invoices');
    // 重定向到 /dashboard/invoices 页面
    redirect('/dashboard/invoices');
}