class Produto{

    constructor(){
        this.id = 1
        this.arrayProducts = []
    }

    save(){
        let product = this.readData()

        if (this.checkFields(product)){
            this.add(product)
            this.cancel()
        }

        this.makeTable()
    }

    add(product){
        this.arrayProducts.push(product)
        this.id++
    }

    makeTable(){
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''

        for(let item in this.arrayProducts){
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            let td_product = tr.insertCell()
            let td_value = tr.insertCell()
            let td_actions = tr.insertCell()

            td_id.innerText = this.arrayProducts[item].id
            td_product.innerText = this.arrayProducts[item].name
            td_value.innerText = this.arrayProducts[item].value

            td_id.classList.add('center')
            td_actions.classList.add('center')

            let imgEdit = document.createElement('img')
            imgEdit.src = 'img/escrever.png'

            let imgDelete = document.createElement('img')
            imgDelete.src = 'img/excluir.png'
            imgDelete.setAttribute('onclick', 'produto.delete(' + this.arrayProducts[item].id + ')')

            td_actions.appendChild(imgEdit)
            td_actions.appendChild(imgDelete)
        }
    }

    delete(id){
        let tbody = document.getElementById('tbody')

        for(let item in this.arrayProducts){
            if (id == this.arrayProducts[item].id){
                this.arrayProducts.splice(item, 1)
                tbody.deleteRow(item)
            }
        }
        //this.makeTable()
    }

    cancel(){
        document.getElementById('produto').value = ''
        document.getElementById('valor').value = ''
    }

    readData(){
        let product = {}

        product.id = this.id
        product.name = document.getElementById('produto').value
        product.value = document.getElementById('valor').value

        return product
    }

    checkFields(product){
        let msg = ''
        
        if(product.name == ''){
            msg += '- Informe o Nome do Produto \n'
        }
        if(product.value == ''){
            msg += '- Informeo o Preço do Produto'
        }

        if (msg != ''){
            alert(msg)
            return false
        }

        return true
    }
}

var produto = new Produto()