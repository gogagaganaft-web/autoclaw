export type SideNavigationItem = {
  text: string;
  path: string;
  /** Уникальный ключ узла (заполняется при нормализации; у групп path пустой). */
  id?: string;
  icon?: string;
  expanded?: boolean;
  items?: SideNavigationItem[];
};
