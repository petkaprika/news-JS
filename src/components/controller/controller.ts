import AppLoader from './appLoader';
import { SourcesResponse } from '../../types/source.types';
import { NewsResponse } from '../../types/article.types';
import { ApiEndpoint } from '../../types/api.types';

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp(
            {
                endpoint: ApiEndpoint.SOURCES,
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: NewsResponse) => void): void {
        let target: Element | null = e.target instanceof Element ? e.target : null;
        const newsContainer = e.currentTarget as HTMLDivElement;

        while (target !== newsContainer && target !== null) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (!sourceId) {
                    return;
                }
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: ApiEndpoint.EVERYTHING,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
