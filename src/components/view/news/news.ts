import './news.css';
import { Article } from '../../../types/article.types';

export function getElement<T extends Element>(parent: ParentNode, selector: string): T {
    const element = parent.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Element "${selector}" not found!`);
    }

    return element;
}

class News {
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            throw new Error('News item template not found!');
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) getElement<HTMLElement>(newsClone, '.news__item').classList.add('alt');

            getElement<HTMLElement>(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            getElement<HTMLElement>(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
            getElement<HTMLElement>(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getElement<HTMLElement>(newsClone, '.news__description-title').textContent = item.title;
            getElement<HTMLElement>(newsClone, '.news__description-source').textContent = item.source.name;
            getElement<HTMLElement>(newsClone, '.news__description-content').textContent = item.description;
            getElement<HTMLAnchorElement>(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector<HTMLElement>('.news');

        if (!newsContainer) {
            throw new Error('News container not found!');
        }

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
