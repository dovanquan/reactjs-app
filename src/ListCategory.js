import React, { Component } from 'react';
import './App.css';

class CategoryHeader extends Component {
  render () {
    return (
      <tr><th>Category</th><th colspan="2">Options</th></tr>
    );
  }
}

class FormAddCategory extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.insertCategory = this.insertCategory.bind(this);
  }
  
  handleChange(e) {
    this.props.onHandleChange(e.target.value);
  }
  insertCategory() {
    this.props.onInsertCategory();
  }
  
  render () {
    return (
      <div class="formIput">
        <input
          type="text"
          placeholder="Input category"
          onChange={ this.handleChange }
          />
        <button onClick={ this.insertCategory }>Add</button>
      </div>
    );
  }
}

class CategoryTable extends Component {
  constructor(props) {
    super(props);
    this.formUpdate = this.formUpdate.bind(this);
    this.updateButton = this.updateButton.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this)
    this.showFormEdit = this.showFormEdit.bind(this)
    this.editCategory = this.editCategory.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
  }

  formUpdate(isEdit, name, index, id, editValue) {
    return (isEdit && id==index) ? <input type="text" value={editValue} onChange={ this.handleChange2} /> : name
  }
  
  updateButton(isEdit, name, index, id) {
    let beforeButton = <button onClick={this.showFormEdit.bind(this, name, index)}>Edit</button>
    let afterButton = <div><button onClick={this.editCategory.bind(this, id)}>Save</button><button onClick={this.cancelEdit}>Cancel</button></div>
    return (isEdit && id==index) ? afterButton : beforeButton;
  }

  deleteCategory(index) {
    this.props.onDeleteCategory(index);
  }
  showFormEdit(name, index) {
    this.props.onShowFormEdit(name, index);
  }
  editCategory(id) {
    this.props.onEditCategory(id);
  }
  handleChange2(e) {
    this.props.onHandleChange2(e.target.value);
  }

  cancelEdit() {
    this.props.onCancelEdit();
  }

  render () {
    const categories = this.props.categories;
    const isEdit = this.props.isEdit;
    const editValue = this.props.editValue;
    const id = this.props.id;
    return (
      <table>
        <CategoryHeader />
        {categories.map((name, index) => {
          return <tr>
                <td>{this.formUpdate(isEdit, name, index, id, editValue)}</td>
                <td class="w">{this.updateButton(isEdit, name, index, id)}</td>
                <td class="w"><button onClick={this.deleteCategory.bind(this, index)}>Delete</button></td>
            </tr>
        })}
      </table>
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
    console.log(this.state.textvalue);
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
  
  handleChange(textvalue) {
    this.setState({
      textvalue:textvalue
    })
  }
  
  handleChange2(editValue) {
    this.setState({
      editValue:editValue
    })
  }
  
  showFormEdit(name, index) {
    this.setState({
      isEdit:true,
      editValue:name,
      id:index
    })
  }

  render() {
    let { categories, isEdit, editValue, id  } = this.state;
    return (
      <div class="content">
        <FormAddCategory 
          onHandleChange={this.handleChange}
          onInsertCategory={this.insertCategory}
        />
        <CategoryTable
          categories={categories}
          isEdit={isEdit}
          editValue={editValue}
          id={id}
          onDeleteCategory={this.deleteCategory}
          onShowFormEdit={this.showFormEdit}
          onEditCategory={this.editCategory}
          onHandleChange2={this.handleChange2}
          onCancelEdit={this.cancelEdit}
        />
      </div>
    )
  }
}

export default ListCategory;