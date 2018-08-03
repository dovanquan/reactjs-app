import React, { Component } from 'react';
import './App.css';

class FormAddCategory extends Component {
  render () {
    return (
      <div class="formIput">
        <input type="text" placeholder="Input category" onChange={ this.props.handleChange } />
        <button onClick={ this.props.insertCategory }>Add</button>
      </div>
    );
  }
}

class ListCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ['PHP', 'Laravel' , 'Cakephp', 'Angular', 'Reactjs'],
      textvalue : "",
      editValue :'',
      isEdit : false,
      id :'',
    }
    this.insertCategory = this.insertCategory.bind(this)
    this.editCategory = this.editCategory.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.showFormEdit = this.showFormEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
  }
  
  insertCategory() {
    this.state.categories.push(this.state.textvalue)
    this.setState(
      this.state
    )
  }

  editCategory(id) {
    this.state.categories[id] = this.state.editValue
    this.setState({
      categories:this.state.categories,
      isEdit:false
    })
  }
  
  deleteCategory(index) {
    delete this.state.categories[index] ? this.setState({ categories:this.state.categories }) : ''
  }

  cancelEdit() {
    this.setState({
      isEdit : false
    })
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
  
  showFormEdit(name, index) {
    this.setState({
      isEdit:true,
      editValue:name,
      id:index
    })
  }

  formUpdate(isEdit, name, index, id, editValue) {
    return (isEdit && id==index) ? <input type="text" value={editValue} onChange={ this.handleChange2} /> : name
  }
  
  updateButton(isEdit, name, index, id) {
    let beforeButton = <button onClick={this.showFormEdit.bind(this, name, index)}>Edit</button>
    let afterButton = <div><button onClick={this.editCategory.bind(this, id)}>Save</button><button onClick={this.cancelEdit}>Cancel</button></div>
    return (isEdit && id==index) ? afterButton : beforeButton;
  }

  render() {
    let { categories, isEdit, editValue, id  } = this.state;
    return (
      <div class="content">
        <FormAddCategory handleChange={this.handleChange.bind(this)} insertCategory={this.insertCategory.bind(this)} />
        <table>
          <tr><th>Category</th><th colspan="2">Options</th></tr>
            {categories.map((name, index) => {
              return <tr>
                    <td>{this.formUpdate(isEdit, name, index, id, editValue)}</td>
                    <td class="w">
                    {this.updateButton(isEdit, name, index, id)}
                    </td>
                    <td class="w"><button onClick={this.deleteCategory.bind(this, index)}>Delete</button></td>
                </tr>
            })}
        </table>
      </div>
    )
  }
}

export default ListCategory;