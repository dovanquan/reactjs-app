import React, { Component } from 'react';
import './App.css';

class ListCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ['PHP', 'Laravel' , 'Cakephp', 'Angular', 'Reactjs'],
      textvalue : "",
      isEdit : false,
      editValue :'',
      id :'',
    }
    this.addCategory = this.addCategory.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.editCategory = this.editCategory.bind(this)
    this.redirectFormEdit = this.redirectFormEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
  }
  
  addCategory() {
    this.state.categories.push(this.state.textvalue)
    this.setState(
      this.state
    )
  }

  editCategory(id) {
    for(var i = 0; i < this.state.categories.length; i++){
      if(this.state.categories[i] == this.state.categories[id]){
        this.state.categories[i] = this.state.editValue
      }
    }
    this.setState({
      categories:this.state.categories
    })
  }
  
  deleteCategory(v) {
    for(var i = 0; i < this.state.categories.length; i++){
      if(this.state.categories[i] == v){
        delete this.state.categories[i]
      }
    }
    this.setState({
      categories:this.state.categories
    })
  }

  getFormAdd() {
    return (
      <div class="formIput">
        <input type="text" placeholder="Input category" onChange={ this.handleChange } />
        <button onClick={this.addCategory}>Add</button>
      </div>
    );
  }

  getFormEdit(isEdit, id, editValue) {
    if (isEdit) {
      return (
        <div class="formIput">
          <input type="text" value={editValue} onChange={ this.handleChange2} />
          <button onClick={this.editCategory.bind(this, id)}  >Save</button>
        </div>
      );
    }
  }

  handleChange(e) {
    this.setState({
      textvalue:e.target.value
    })
  }

  handleChange2(e) {
    this.setState({
      editValue:e.target.value
    })
  }
  
  redirectFormEdit(v, index) {
    this.setState({
      isEdit:true,
      editValue:v,
      id:index
    })
  }

  render() {
    let { categories } = this.state;
    const  isEdit = this.state.isEdit;
    const  editValue = this.state.editValue;
    const  id = this.state.id;

    return (
      <div class="content">
        {this.getFormAdd()}
        {this.getFormEdit(isEdit, id, editValue)}
        <table>
          <tr><th>Category</th><th colspan="2">Options</th></tr>
            {categories.map((v,index) => {
              return <tr>
                    <td>{v}</td>
                    <td class="w"><button onClick={this.redirectFormEdit.bind(this, v, index)}>Edit</button></td>
                    <td class="w"><button onClick={this.deleteCategory.bind(this, v)}>Delete</button></td>
                </tr>
            })}
        </table>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className='App'>
        <ListCategory />
      </div>
    );
  }
}

export default App;
