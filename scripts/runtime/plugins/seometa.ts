import { useDynamicRouteParam } from '../composables/extend/dynamicRoute/useDynamicRouteParam';
import { defineNuxtPlugin, useRoute } from '#app';
import { useSeoMeta } from '#imports';
//

export default defineNuxtPlugin((nuxtApp) => {
 nuxtApp.hook('page:loading:start', () => {
  const lang = useDynamicRouteParam('lang');
  const route = useRoute();
  useSeoMeta({
   title: () => (route.meta[`title:${lang.value}`] || route.meta.title) as string,
   description: () => (route.meta[`description:${lang.value}`] || route.meta.description) as string,
  });
 });
});
