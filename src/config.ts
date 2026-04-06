/** Реквизиты организации и ссылки на соцсети (то же, что на основном сайте). */
export const operatorFullName =
  'Общество с ограниченной ответственностью «Автопрофи»'
export const operatorName = 'ООО «Автопрофи»'
export const operatorOgrn = '1237600011770'
export const operatorInn = '7604394907'
export const operatorKpp = '760401001'
export const operatorAddress =
  '150049, Ярославская область, г. Ярославль, пр-кт Толбухина, д. 17/65, помещ. 42'

/** Из `.env`: OPERATOR_EMAIL — для документов, футера и SMTP (Node/PHP). */
export const operatorEmail = import.meta.env.OPERATOR_EMAIL

/** Телефон для блока «Связаться» (кликабельная ссылка tel:). */
export const operatorPhone = 'phone'

/** Ссылки на соцсети в подвале (только VK и Max), из `.env`. */
export const linkVk = import.meta.env.OPERATOR_LINK_VK ?? ''
export const linkMax = import.meta.env.OPERATOR_LINK_MAX ?? ''

/** Иконки соцсетей (файлы в public). */
export const iconVk = '/vk_icon.svg'
export const iconMax = '/max_icon.svg'
