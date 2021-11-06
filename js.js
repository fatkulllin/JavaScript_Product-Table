let name   = document.querySelector('#name');
let price  = document.querySelector('#price');
let amount = document.querySelector('#amount');
let add    = document.querySelector('#add');
let table  = document.querySelector('#table');
let total  = document.querySelector('#total');

add.addEventListener('click', function() {
	let tr = document.createElement('tr');

    allowEdit(createCell(tr, name.value, 'name'));
    allowEdit(createCell(tr, price.value, 'price'));
    allowEdit(createCell(tr, amount.value, 'amount'));
    createCell(tr,price.value*amount.value, 'cost');

	createCell(tr,'удалить', 'remove').addEventListener('click', function(){
        tr.remove()
        recountTotal();
    });
	
	table.appendChild(tr);
    recountTotal();
});

function createCell(tr, value, name) {
    let td = document.createElement('td');
	td.innerHTML = value;
	td.classList.add(name);
	tr.appendChild(td);
    return td;
};

function recountTotal() {
	let costs = table.querySelectorAll('.cost');
	let sum = 0;
	if (costs) {
		for( let elem of costs){
           sum +=Number( elem.innerHTML)
        };
	};
    total.innerHTML = sum;
};

function allowEdit(td) {
	td.addEventListener('dblclick', function func() {

		let input = document.createElement('input');
        input.value = td.innerHTML;
        td.innerHTML = '';
        this.appendChild(input);

        input.addEventListener('blur',function (){
            td.innerHTML = this.value
            
            if (td.classList.contains('price') || td.classList.contains('amount')) {
                let parent = td.parentElement
                let price = parent.querySelector('.price')
                let amount = parent.querySelector('.amount')
                let cost = parent.querySelector('.cost')

                cost.innerHTML = Number(price.innerHTML) * Number(amount.innerHTML)
                recountTotal()
            }

            td.addEventListener('dblclick',func)
        });

        this.removeEventListener('dblclick', func);
        
	});
};