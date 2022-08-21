const list = document.getElementById('list'),
    btn = document.getElementById('btn');

const people = [
    'Sergey',
    'Kate',
    'Max',
    'Andrew'
];

const store__items = [];

let start__droplist;

createList();

function createList() {
    [...people]
    .map(a => ({
            value: a,
            sort: Math.random()
        }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
        const list__item = document.createElement('li');

        list__item.setAttribute('data-index', index);

        list__item.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="drag-list" draggable="true">
                <p class="person">${person}</p>
            </div>
        `;

        store__items.push(list__item);

        list.appendChild(list__item);
    });

    actionDraggable();
}

function dragStart() {
    // console.log('Event: ', 'dragstart');
    start__droplist = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}

function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}

function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
}

function dragDrop() {
    // console.log('Event: ', 'drop');
    const end__droplist = +this.getAttribute('data-index');
    swapItems(start__droplist, end__droplist);

    this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const item__one = store__items[fromIndex].querySelector('.drag-list');
    const item__two = store__items[toIndex].querySelector('.drag-list');

    store__items[fromIndex].appendChild(item__two);
    store__items[toIndex].appendChild(item__one);
}


// Check the order of list items
function checkOrder() {
    store__items.forEach((item, index) => {
        const person = item.querySelector('.drag-list').innerText.trim();

        if (person !== people[index]) {
            item.classList.add('wrong');
        } else {
            item.classList.remove('wrong');
            item.classList.add('right');
        }
    });
}

function actionDraggable() {
    const draggables = document.querySelectorAll('.drag-list'),
        all__items = document.querySelectorAll('.list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    all__items.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

btn.addEventListener('click', checkOrder);