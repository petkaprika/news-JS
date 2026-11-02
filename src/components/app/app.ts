import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsResponse } from '../../types/article.types';
import { SourcesResponse } from '../../types/source.types';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources = document.querySelector<HTMLDivElement>('.sources');
        if (sources) {
            sources.addEventListener('click', (e: MouseEvent) =>
                this.controller.getNews(e, (data: NewsResponse) => this.view.drawNews(data))
            );
            this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
        } else {
            throw new Error('sources not found!');
        }
    }
}

export default App;
