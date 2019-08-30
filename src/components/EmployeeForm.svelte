
<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let submitting = false;
    let error = false;
    let success = false;
    let employee = {name: '', email: ''};
    let invalidEmail = false;
    let invalidName = false;
    let first;

    function handleSubmit() {
        submitting = true
        clearStatus()

        invalidEmail = employee.email === '';
        invalidName = employee.name === '';
        if (invalidName || invalidEmail) {
            error = true
            return
        }

        dispatch('add-employee', employee);
        first.focus()
        employee = {name: '', email: ''};
        error = false
        success = true
        submitting = false
    }
  

    function clearStatus() {
        success = false
        error = false
    }
 
</script>


<style scoped>
  form {
    margin-bottom: 2rem;
  }

  [class*='-message'] {
    font-weight: 500;
  }

  .error-message {
    color: #d33c40;
  }

  .success-message {
    color: #32a95d;
  }

</style>

<div id="employee-form">
    <form on:submit|preventDefault={handleSubmit}>
        <label>Employee name</label>
        <input 
            bind:this={first}
            type="text" 
            class={submitting && invalidName ? 'has-error' : '' }
            bind:value={employee.name}
            on:focus={clearStatus}
            on:keypress={clearStatus}
        />
        <label>Employee Email</label>
        <input 
            type="text" 
            class={submitting && invalidEmail? 'has-error' : '' }
            bind:value={employee.email}
            on:focus={clearStatus}
        />
        {#if error && submitting}
            <p  class="error-message">❗ Please fill out all required fields</p> 
        {/if}
        {#if success}
            <p  class="success-message"> ✅ Employee successfully added</p> 
        {/if}
        <button>Add Employee</button>
    </form>
</div>
