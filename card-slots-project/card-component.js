const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
        .card {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 20px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            border-top: 4px solid #6c8bff;
            height: 100%; 
            display: flex;
            flex-direction: column;
        }
        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .card-header {
            margin-bottom: 12px;
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
            color: #2c3e50;
        }
        .card-content {
            color: #555;
            line-height: 1.5;
            flex-grow: 1;
            /* Убедимся, что контент не вылезает */
            overflow: hidden; 
        }
        
        /* Универсальный стиль для всех элементов в слотах */
        ::slotted(*) {
            max-width: 100%;
        }
        ::slotted(h2) {
            margin: 0;
            font-size: 20px;
        }
        ::slotted(p) {
            margin: 0 0 8px 0;
        }
    </style>

    <div class="card">
        <div class="card-header">
            <slot name="header"></slot>
        </div>
        <div class="card-content">
            <slot name="content"></slot>
        </div>
    </div>
`;

class CardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const templates = this.querySelectorAll('template');

        templates.forEach(tpl => {
            const slotName = tpl.getAttribute('slot');
            if (slotName) {
                const wrapper = document.createElement('div');
                wrapper.setAttribute('slot', slotName);
                wrapper.style.width = '100%';
                
                wrapper.appendChild(tpl.content.cloneNode(true));
                
                this.appendChild(wrapper);
            }
        });
    }
}

customElements.define('card-component', CardComponent);