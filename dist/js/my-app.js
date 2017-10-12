// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});

var businessArticles;
var businessList = '#business_list';

myApp.onPageInit('business', function (page) {

    if (businessArticles === undefined) {

        $$.getJSON('https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=7fc906d8914b4b03a009f74688717037',

            function (data) {

                // Storing JSON articles to be used wherever necessary
                businessArticles = data.articles;

                // Rendering a list with the results
                displayArticles(businessArticles, businessList);

            },

            function (error) {
                console.log('Error getting JSON!', error)
            })
    } else {
        displayArticles(businessArticles, businessList)
    }
});


// Renders list of articles to be displayed
function displayArticles(articles, listId) {

    $$.each(articles, function (i) {
        $$(listId).append(`
                <li>
                <a href="#" class="item-link item-content">
                  <div class="item-media"><img src="${articles[i].urlToImage}" width="100"></div>
                  <div class="item-inner">
                    <div class="item-title-row">
                      <div class="item-title">${articles[i].title}</div>
                    </div>
                    <div class="item-subtitle">${articles[i].author}</div>
                    <div class="item-text">${articles[i].description}</div>
                  </div>
                </a>
              </li>`);

    });
}
