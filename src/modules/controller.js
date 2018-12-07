import model from './model.js';
import view from './view.js';

let friendsVK = {};
let friendsFavorite = {};


export default {
    async addFriends() { // добавление друзей в списки
        const results = document.querySelector('#friends__vk');
        const friends = await model.getFriends({ fields: 'photo_100' });
        const friendsFavoriteList = document.getElementById('friends-favorite');
        
        friendsFavorite = model.getLocalStorage();  
        friendsFavoriteList.innerHTML = view.renderFromVK({'items':friendsFavorite}, 'favorite-template');
        results.innerHTML = view.renderFromVK({'items':friendsVK}, 'friends-template');

        for (let item of friends.items) {
            let obj = {
                'id':`${item.id}`, 
                'full_name':`${item.first_name} ${item.last_name}`,
                'photo_100':item.photo_100
            };
            if (friendsFavorite[item.id] === undefined) {
                friendsVK[item.id] = obj;
            }
        }
        
        results.innerHTML = view.renderFromVK({'items':friendsVK}, 'friends-template');
        
    },
    isFriend(name, chunk) { // проверка на соответствие поиску
        name = name.toLowerCase();
        chunk = chunk.toLowerCase();
        
        return name.indexOf(chunk) >=0 ? true : false;
    },
    moveFriend(friend, friendsList) { // перемещение друзей
        const friendNav = friend.querySelector('.friend__nav');

        let friendParam = {};
        let idFriend = friend.attributes['data-id'].nodeValue;
        
        friendParam['action'] = friendNav.getAttribute('data-action');
        if (friendParam.action === 'add') {
            friendParam['dnd'] = false;
            friendParam['actionInvert'] = 'del';
            friendsFavorite[idFriend] = friendsVK[idFriend];
            delete friendsVK[idFriend];
        } else {
            friendParam['dnd'] = true;
            friendParam['actionInvert'] = 'add';
            friendsVK[idFriend] = friendsFavorite[idFriend];
            delete friendsFavorite[idFriend];
        }       

        view.renderMove(friendNav, friendsList, friendParam);
    },
    search(field, friendsList) { // вывод по результатам
        let searchFriends = {};
        let objFriends, templateName;
        switch (friendsList.id) {
            case 'friends__vk':
                objFriends = friendsVK;
                templateName = 'friends-template';
                break;
            case 'friends-favorite':
                objFriends = friendsFavorite;
                templateName = 'favorite-template';
                break;
            default:
                break;
        }
        friendsList.innerHTML = '';
        for (let item in objFriends) {
            if (this.isFriend(objFriends[item].full_name, field)) {
                searchFriends[item] = objFriends[item];
            }
        }
        friendsList.innerHTML = view.renderFromVK({'items':searchFriends}, templateName);
    }, 
    addLocalStorage() { // сохраняем в localStorage
        model.setLocalStorage(friendsFavorite);
    }
};