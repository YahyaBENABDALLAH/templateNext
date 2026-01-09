import axios, { AxiosInstance } from 'axios';
import   { redirect,RedirectType } from 'next/navigation';
import { requestNewToken } from './auth.refresh';

type AxiosFactoryOptions = {
  skipInterceptor?: boolean;
  router?: RedirectType;
  withCredentials?: boolean;
};

const NOT_FOUND_ROUTE = '/not-found';

let refreshingPromise: Promise<void> | null = null;

const startRefreshing = (runner: () => Promise<void>) => {
  if (!refreshingPromise) {
    refreshingPromise = runner()
      .then(() => {})
      .finally(() => {
        refreshingPromise = null;
      });
  }
  return refreshingPromise;
};
export const getRefreshing = () => refreshingPromise;
const redirectToNotFound = (router?: RedirectType) => {
  if (router) {
    redirect(NOT_FOUND_ROUTE);
  } else if (typeof window !== 'undefined') {
    window.location.href = NOT_FOUND_ROUTE;
  }
};

const createAxiosInstance = (
  baseURL: string | undefined,
  { skipInterceptor = false, router, withCredentials = true }: AxiosFactoryOptions = {},
): AxiosInstance => {
  if (!baseURL) {
    throw new Error('baseURL is required');
  }

  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials,
  });

  // ⏱️ Ajouter un délai de 6 secondes avant chaque requête
  // instance.interceptors.request.use(async (config) => {
  //   await new Promise((resolve) => setTimeout(resolve, 6000));
  //   return config;
  // });

  if (!skipInterceptor) {
    instance.interceptors.response.use(
      (response) => {
        // Réponse OK (2xx)
        // console.log(`✅ [${response.config.method?.toUpperCase()}] ${response.config.url} → ${response.status}`);
        // if (response.data)console.log("Data",response.data);

        return response;
      },
      async (err) => {
        const originalConfig = err.config;

        if (err.response) {
          const { status, data } = err.response;

          switch (status) {
            case 400:
              redirectToNotFound(router);
              console.warn('❌ Mauvaise requête :', data?.message);
              break;

            case 401: {
              if (!originalConfig._retry) {
                originalConfig._retry = true;

                try {
                  const wait = getRefreshing() ?? startRefreshing(requestNewToken);
                  await wait;

                  return instance(originalConfig);
                } catch (e) {
                  return Promise.reject(e);
                }
              }
              break;
            }

            case 403:
              console.warn('🚫 Accès interdit :', data?.message);
              // redirectToNotFound(router);
              break;

            case 404:
              // redirectToNotFound(router);
              break;

            case 409:
              console.warn('⚠️ Conflit détecté :', data?.message);
              break;

            case 422:
              console.warn('⚠️ Données invalides :', data?.errors || data?.message);
              break;

            case 429:
              console.warn('⏳ Trop de requêtes, réessaye plus tard');
              break;

            default:
              redirectToNotFound(router);
              console.error('❗ Erreur non gérée', status, data);
              break;
          }
        }

        return Promise.reject(err?.response?.data?.message);
      },
    );
  }
  return instance;
};

export const authAxios = createAxiosInstance(process.env.NEXT_PUBLIC_USER_MANAGEMENT_URL + '/auth', {
  skipInterceptor: true,
});
export const pokemonAxios = createAxiosInstance(process.env.NEXT_PUBLIC_POKEMON_API_URL, {
  withCredentials: false,
});
