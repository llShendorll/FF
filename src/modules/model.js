let storage = localStorage;

export default {
    auth(appId, perms) {
        return new Promise((resolve, reject) => {
            VK.init({
                apiId: appId
            });

            VK.Auth.login(response => {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, perms);
        });
    },
    callAPI(method, params) {
        params.v = '5.76';
    
        return new Promise((resolve, reject) => {
            VK.api(method, params, (data) => {
                if (data.error) {
                    reject(data.error);
                } else {
                    resolve(data.response);
                }
            });
        })
    },
    getFriends(params = {}) {
        return this.callAPI('friends.get', params);
    },
    getLocalStorage() {
        return storage.data ? JSON.parse(storage.data) : {};  
    },
    setLocalStorage(friendsFavorite) {
        if (Object.keys(friendsFavorite).length > 0) {
            storage.data = JSON.stringify(friendsFavorite);
        } else {
            storage.data = '';    
        }
    }
};