export default {
    renderFromVK(data, templateName) {
        const template = document.getElementById(templateName).textContent;
        const render = Handlebars.compile(template);

        console.log(template);
        const html = render(data);

        return html;
    },
    renderMove(friend, friendsList, params) {
        const frientItem = friend.parentNode;

        frientItem.setAttribute('draggable', params.dnd);
        friend.setAttribute('data-action', params.actionInvert);
        friend.classList.remove(`friend_${params.action}`);
        friend.classList.add(`friend_${params.actionInvert}`);
        friendsList.appendChild(frientItem);
    }
};