import SideNav from '@/app/ui/dashboard/sidenav';
// export const experimental_ppr = true;
// 可能在开发过程中看不到应用程序的差异，但应该注意到生产过程中的性能改进。
// Next.js 将预渲染路由的静态部分，并推迟动态部分，直到用户请求它们。
// 部分预渲染的优点在于您无需更改代码即可使用它。只要您使用 Suspense 包装路线的动态部分，Next.js 就会知道路线的哪些部分是静态的，哪些部分是动态的。

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}