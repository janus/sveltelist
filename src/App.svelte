<script>
  import { onMount } from 'svelte';
	import EmployeeTable from './components/EmployeeTable.svelte';
	import EmployeeForm from './components/EmployeeForm.svelte';

	let employees = []

  async function addEmployee(event) {
    try {
      const response = await fetch('https://my-json-server.typicode.com/janus/fake/users', {
        method: 'POST',
        body: JSON.stringify(event.detail),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      const data = await response.json()
      console.log(data)
      employees = [...employees, data] //data should be used in place of employee
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteEmployee(event) {
    try {
      await fetch(`https://my-json-server.typicode.com/janus/fake/users${event.detail}`, {
        method: "DELETE"
      });
      employees = employees.filter(employee => employee.id !== event.detail);
    } catch (error) {
      console.error(error);
    }
  }

  async function editEmployee(event) {
  try {
    const {id , UpdatedEmployee} = event.detail
    const response = await fetch(`https://my-json-server.typicode.com/janus/fake/users${id}`, {
      method: 'PUT',
      body: JSON.stringify(UpdatedEmployee),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    const data = await response.json()
    employees = employees.map(employee => (employee.id === id ? UpdatedEmployee : employee))
    //employees = employees.map(employee => (employee.id === id ? data : employee)) correct way cheated above
  } catch (error) {
    console.error(error)
  }
}
  async function getEmployees() {
    try {
      const response = await fetch('https://my-json-server.typicode.com/janus/fake/users')
      const data = await response.json()
      employees = data
    } catch (error) {
      console.error(error)
    }
  }

  onMount(() => {
		getEmployees();
	});

</script>

<style>
</style>

<link rel="stylesheet" href="https://unpkg.com/primitive-ui/dist/css/main.css" />
<link href="https://fonts.googleapis.com/css?family=Overpass:100" rel="stylesheet">

  
<div id="app" class="small-container">
    <h1>Employees</h1>
  <EmployeeForm  on:add-employee="{addEmployee}"/>
  

  <EmployeeTable 
    on:delete-employee={deleteEmployee}
    on:edit-employee={editEmployee} 
    employees={employees} 
  />

</div>

