import * as boostrap from 'bootstrap';


const colorByType = {
    "success": "text-bg-success",
    "error": "text-bg-danger",
    "warning": "text-bg-warning",
}

const titleByType = {
    "success": "Éxito",
    "error": "Error",
    "warning": "Alerta",
}


const createToast = ( type, msg ) => {

    const className = colorByType[ type ];

    const toastEl = document.querySelector('#myToast');
    toastEl.classList.add( className );

    const body = toastEl.querySelector('.toast-body');
    body.innerText = msg;

    const strong = toastEl.querySelector('strong');
    strong.innerText = titleByType[ type ];

    const toast = new boostrap.Toast(toastEl);

    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.classList.remove( className );
    })

    toast.show();
}


export const fireToast = {
    success: ( msg ) => {
        createToast( 'success', msg );
    },
    error: ( msg ) => {
        createToast( 'error', msg );
    },
    warning: ( msg ) => {
        createToast( 'warning', msg );
    },
}