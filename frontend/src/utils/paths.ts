export const paths = {
  default: "/",
  login: "/login_panel",
  moneySettlement: "/money_settlement",
  fuelcalculator: "/fuel_calculator",
  logs: "/logs",
  tasks: "/tasks",
  notFound: "/:pathMatch(.*)*",
};

export type Link = {
  title: string;
  path: string;
};

export const pathsArtek: Link[] = [
  {
    title: "navSlider.links.artek.moneySettlement",
    path: paths.moneySettlement,
  },
  {
    title: "navSlider.links.artek.tasks",
    path: paths.tasks,
  },
  {
    title: "navSlider.links.artek.fuelCalculator",
    path: paths.fuelcalculator,
  },
  {
    title: "navSlider.links.artek.log",
    path: paths.logs,
  },
];
