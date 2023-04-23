import { useEffect, FC } from 'react'
import { NextSeo } from 'next-seo'
import NavBar from '../components/Navigation/NavBar'
import SideBar from '../components/Navigation/SideBar'
import Footer from '../components/Footer'
import TableOfContents from '~/components/TableOfContents'

interface Props {
  meta: { title: string; description?: string; hide_table_of_contents?: boolean }
  children: any
  toc?: any
  menuItems: any
  currentPage: string
}

const Layout: FC<Props> = ({ meta, children, toc, menuItems, currentPage }) => {
  useEffect(() => {
    const key = localStorage.getItem('supabaseDarkMode')
    if (!key) {
      // Default to dark mode if no preference config
      document.documentElement.className = ''
    } else {
      document.documentElement.className = key === 'true' ? '' : ''
    }
  }, [])

  const hasTableOfContents =
    toc !== undefined && toc.json.filter((item) => item.lvl !== 1 && item.lvl <= 3).length > 0

  return (
    <>
      <NextSeo
        title={`${meta?.title} | Supabase`}
        description={meta?.description ? meta?.description : meta?.title}
        openGraph={{
          title: meta?.title,
          description: meta?.description,
          url: `https://supabase.com/docs/${currentPage}`,
          images: [
            {
              url: `https://base.memfiredb.com/assets/img/logo.top.svg`,
            },
          ],
        }}
      />

      <main>
        <NavBar currentPage={currentPage} />
        <div className="flex w-full flex-row">
          <SideBar menuItems={menuItems} />
          <div className="main-content-pane docs-width grid md:grid-cols-12 gap-4 justify-between p-4 pb-8 w-full">
            <div
              className={`${
                meta?.hide_table_of_contents || !hasTableOfContents
                  ? 'col-span-12 xl:col-start-2 xl:col-span-10 2xl:col-start-3 2xl:col-span-8'
                  : 'col-span-12 lg:col-span-9'
              } py-2 lg:py-4 px-2 lg:px-8 mx-auto`}
            >
              <article
                className={`${
                  meta?.hide_table_of_contents || !hasTableOfContents ? 'xl:min-w-[880px]' : ''
                } doc-content-container prose width-full mt-8 2xl:max-w-[880px]`}
              >
                {children}
              </article>
            </div>
            {hasTableOfContents && !meta?.hide_table_of_contents && (
              <div
                className={[
                  'border-scale-400  table-of-contents-height border-l',
                  'thin-scrollbar overflow-y-auto sticky hidden xl:block md:col-span-3 px-2',
                ].join(' ')}
              >
                <TableOfContents toc={toc} />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Layout
