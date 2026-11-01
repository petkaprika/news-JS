import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/mocks/', {});
    }
}

export default AppLoader;
