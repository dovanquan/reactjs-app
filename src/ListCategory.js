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
  }
  
  handleChange = (e) => {
    this.props.onHandleChange(e.target.value);
  }
  insertCategory = () => {
    this.props.onInsertCategory();
  }
  
  render () {
    return (
      <div class="formIput">
        <input
          type="text"
          placeholder="Input category"
          onChange={(e) => { this.handleChange(e) }}
        />
        <button onClick={(e) => { this.insertCategory(e) }}>Add</button>
      </div>
    );
  }
}

class CategoryTable extends Component {
  constructor(props) {
    super(props);
  }

  formUpdate = (isEdit, name, index, id, editValue) => {
    return (isEdit && id==index) ? <input type="text" value={editValue} onChange={(e) => { this.handleChangeValue(e) }} /> : name
  }
  
  updateButton = (isEdit, name, index, id) => {
    let beforeButton = <button onClick={() => { this.showFormEdit(name, index) }}>Edit</button>
    let afterButton = <div><button onClick={() => { this.editCategory(id) }}>Save</button><button onClick={() => { this.cancelEdit() }}>Cancel</button></div>
    return (isEdit && id==index) ? afterButton : beforeButton;
  }

  deleteCategory = (index) => {
    this.props.onDeleteCategory(index);
  }
  showFormEdit = (name, index) => {
    this.props.onShowFormEdit(name, index);
  }
  editCategory = (id) => {
    this.props.onEditCategory(id);
  }
  handleChangeValue = (e) => {
    this.props.onHandleChangeValue(e.target.value);
  }

  cancelEdit = () => {
    this.props.onCancelEdit();
  }

  render () {
    const { id, categories, isEdit, editValue } = this.props
    return (
      <table>
        <CategoryHeader />
        {categories.map((name, index) => {
          return <tr key={index}>
            <td>{this.formUpdate(isEdit, name, index, id, editValue)}</td>
            <td class="w">{this.updateButton(isEdit, name, index, id)}</td>
            <td class="w"><button onClick={() => { this.deleteCategory(index) }}>Delete</button></td>
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
  }
  
  insertCategory = () => {
    const { categories } = this.state
    categories.push(this.state.textvalue)

    this.setState(
      categories,
    )
  }

  editCategory = (id) => {
    this.state.categories[id] = this.state.editValue
    this.setState({
      categories: this.state.categories,
      isEdit:false
    })
  }
  
  deleteCategory = (index) => {
    const categories = this.state.categories.filter((item) => {
      return item !== this.state.categories[index]
    })
    this.setState({ categories })
  }

  cancelEdit = () => {
    this.setState({
      isEdit : false
    })
  }
  
  handleChange = (textvalue) => {
    this.setState({
      textvalue:textvalue
    })
  }
  
  handleChangeValue = (editValue) => {
    this.setState({
      editValue:editValue
    })
  }
  
  showFormEdit = (name, index) => {
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
          onHandleChangeValue={this.handleChangeValue}
          onCancelEdit={this.cancelEdit}
        />
      </div>
    )
  }
}

export default ListCategory;