//Criação da classe do produto
class Produto{

    constructor(){
        this.id = 1
        this.arrayProducts = []
        this.edit = null
    }

//Salvar um produto
    save(){
        let product = this.readData()

        if (this.checkFields(product)){
            if (this.edit == null){
                this.add(product)
                this.cancel()
            }else{
                this.refresh(this.edit, product)
            }
            
        }
        this.makeTable()
    }

    refresh(id, product){
        for (let item in this.arrayProducts){
            if (this.arrayProducts[item].id == id){
                this.arrayProducts[item].name = product.name
                this.arrayProducts[item].value = product.value
            }
        }
        document.getElementById('btn1').innerText = 'Salvar'
        this.makeTable()
    }

//Adicionar produto a lista de produtos
    add(product){
        product.value = parseFloat(product.value)
        this.arrayProducts.push(product)
        this.id++
    }

//Indexar a tabela de acordo com a lista de produtos
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
            imgEdit.setAttribute('onclick', 'produto.checkEdit(' + JSON.stringify(this.arrayProducts[item]) + ')')

            let imgDelete = document.createElement('img')
            imgDelete.src = 'img/excluir.png'
            imgDelete.setAttribute('onclick', 'produto.delete(' + this.arrayProducts[item].id + ')')

            td_actions.appendChild(imgEdit)
            td_actions.appendChild(imgDelete)
        }
    }

//Prepara o produto para edição
    checkEdit(data){
        this.edit = data.id

        document.getElementById('produto').value = data.name
        document.getElementById('valor').value = data.value

        document.getElementById('btn1').innerText = 'Atualizar'
    }

//Deleta produto da lista e a linha do html
    delete(id){
        if(confirm('Deseja realimente deletar o produtos com o ID ' + id)){
            let tbody = document.getElementById('tbody')

            for(let item in this.arrayProducts){
                if (id == this.arrayProducts[item].id){
                    this.arrayProducts.splice(item, 1)
                    tbody.deleteRow(item)
                }
            }   
        }
    }

//Setar para vazio os campos
    cancel(){
        document.getElementById('produto').value = ''
        document.getElementById('valor').value = ''
        document.getElementById('btn1').innerText = 'Salvar'
        this.edit = null
    }

//Lê as informações contidas nos campos
    readData(){
        let product = {}

        product.id = this.id
        product.name = document.getElementById('produto').value
        product.value = document.getElementById('valor').value

        return product
    }

//Verifica se todos os campos estão preenchidos
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