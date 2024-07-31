import { useMemo } from 'react'
// routes
import { paths } from 'src/routes/paths'
// components
import SvgColor from 'src/components/svg-color'

// ----------------------------------------------------------------------

const icon = name => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
)

const ICONS = {
  home: icon('ic_home'),
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
}

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      {
        subheader: 'Dashboard',
        items: [
          {
            title: 'home',
            path: paths.home,
            icon: ICONS.home,
          },
          {
            title: 'Sync + Upload',
            path: paths.other,
            icon: ICONS.user,
          },
          {
            title: 'Unwaste Ecosystem',
            path: paths.other,
            icon: ICONS.banking,
          },
          {
            title: 'Orders',
            path: paths.other,
            icon: ICONS.external,
          },
          {
            title: 'Insights',
            path: paths.other,
            icon: ICONS.external,
          },
        ],
      },

      // {
      //   subheader: t('management'),
      //   items: [
      //     // USER
      //     {
      //       title: t('driver'),
      //       path: paths.driver.root,
      //       icon: ICONS.user,
      //       children: [
      //         { title: t('all'), path: paths.driver.root },
      //         { title: t('cards'), path: paths.driver.root },
      //       ],
      //     },

      //     // PRODUCT
      //     {
      //       title: t('races'),
      //       path: paths.home,
      //       icon: ICONS.product,
      //       children: [
      //         { title: t('completed'), path: paths.home },
      //         {
      //           title: t('upcoming'),
      //           path: paths.home,
      //         },
      //       ],
      //     },

      //     // CALENDAR
      //     {
      //       title: t('calendar'),
      //       path: paths.home,
      //       icon: ICONS.calendar,
      //     },
      //   ],
      // },
    ],
    [],
  )

  return data
}
