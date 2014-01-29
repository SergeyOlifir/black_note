if (Country.find().count() === 0) { 
    Country.insert({
        title: 'Украина',
        regions: [
            {
                title: 'Днепропетровская', 
                city: [
                    {
                        title: 'Днепропетровск'
                    },
                    {
                        title: 'Новомосковск'
                    }
                ]
            },
            {
                title: 'Запорожская',
                city: [
                    {
                        title: 'Запорожье'
                    },
                    {
                        title: 'Милитьполь'
                    }
                ]
            }
        ]
    });
}