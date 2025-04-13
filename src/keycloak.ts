import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    url: import.meta.env.VITE_KK_URL,
    realm: import.meta.env.VITE_KK_REALM,
    clientId: import.meta.env.VITE_KK_CLIENTID,
});
