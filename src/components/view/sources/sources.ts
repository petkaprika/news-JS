import './sources.css';
import { NewsSource } from '../../../types/source.types';
import { getElement } from '../news/news';

class Sources {
    draw(data: NewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            throw new Error('Source item template not found!');
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            getElement<HTMLElement>(sourceClone, '.source__item-name').textContent = item.name;
            getElement<HTMLElement>(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector<HTMLElement>('.sources');

        if (!sourcesContainer) {
            throw new Error('Sources container not found!');
        }

        sourcesContainer.append(fragment);
    }
}

export default Sources;
