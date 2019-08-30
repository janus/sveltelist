
<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
	
  export let employees;


  let editing = null;
  let cachedEmployee;

  function deleteHandle(id) {
    console.log("deleteHandle")
    dispatch('delete-employee', id)
  }

  function editMode(employee) {
    cachedEmployee = Object.assign({}, employee)
    editing = employee.id
  }

  function editEmployee(employee) {
    if(employee.name === '' || employee.email === '') return
    dispatch('edit-employee', {id: employee.id, UpdatedEmployee: employee})
    editing = null;

  }

  function cancelEdit(employee) {
    Object.assign(employee, cachedEmployee)
    editing = null;
  }

</script>
<style scoped>
  button {
    margin: 0 0.5rem 0 0;
   }

</style>

  <div id="employee-table">
    {#if employees.length < 1}
      <p class="empty-table">No employees</p>
    {:else}
          <table>
        <thead>
          <tr>
            <th>Employee name</th>
            <th>Employee email</th>
          </tr>
        </thead>
        <tbody>
          {#each employees as employee (employee.id)}
            <tr>
              {#if editing === employee.id}
                <td><input type="text" bind:value={employee.name}></td>
              {:else}
                <td>{employee.name}</td>
              {/if}
              {#if editing === employee.id}
                <td><input type="text" bind:value={employee.email}></td>
              {:else}
                <td>{employee.email}</td>
              {/if}
              {#if editing === employee.id}
                <td>
                  <button on:click={() => editEmployee(employee)} >Save</button>
                  <button class="muted-button" on:click={() => cancelEdit(employee)}>Cancel</button>  
                </td>
              {:else}
                <td>
                  <button on:click={() => editMode(employee)} >Edit</button>
                  <button on:click={() => deleteHandle(employee.id)}>Delete</button>  
                </td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
  {/if}
</div>

