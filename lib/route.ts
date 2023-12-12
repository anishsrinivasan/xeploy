export const getProjectRoute = (projectId: string, routeName: string) => {
  return `/dashboard/project/${projectId}${routeName ? `/${routeName}` : ""}`;
};
