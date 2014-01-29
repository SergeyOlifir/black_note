var menuItems = [ 
    {
        title: 'Главная', 
        url: '/'
    }, 
    {
        title: 'Статьи', 
        url: '/'
    }, 
    {
        title: 'Рейтинги', 
        url: '/'
    },
    {
        title: 'Жалобы/Благодарности', 
        url: '/posts'
    },
    {
        title: 'Законодательство', 
        url: '/'
    },
    {
        title: 'О проекте', 
        url: '/'
    },
    
];

Template.mainMenu.helpers({ 
    menuItems: function() {
        return menuItems; 
    }
});
