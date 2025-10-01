⏩ **Proyecto de Automatización Cypress – Book Store Login**

Este proyecto automatiza el login de la demo **Book Store** (https://demoqa.com/login) utilizando **Cypress ** junto con **Cucumber/Gherkin** para la escritura de escenarios y el patrón **Page Object Model (POM)**.
El flujo incluye la **creación de un usuario real vía API**, el **login exitoso** con ese usuario y un **login fallido** con credenciales no registradas, todo con datos generados dinámicamente mediante **Scenario Outline**.

📝**Generar Reporte**
npm run test:with-report
 y el reporte se encuentra en  CARPETA jsonlogs



⏩ **Estructura de carpetas y archivos**

El proyecto se basa en un repositorio que ya contenía la estructura de ejemplo.
Dentro de esa estructura, yo agregué **nuevos archivos** y una **carpeta `ui`** para agrupar exclusivamente los step definitions de esta funcionalidad.

⏩ **Archivos nuevos detallados**

✅ **cypress/journeys/features/e2e/bookstore_login.feature**
Contiene los escenarios Gherkin:
✅ **cypress/journeys/features/api/petstore-julieta**
**cypress\journeys\features\e2e\UserRegister.feature** ya existian del profe del repositorio que clone
**cypress\journeys\features\e2e\SearchProduct.feature** ya existia del profe del repositorio que clone

✅ **cypress/pages/demoqa/ProfilePage.js** Sirve para validar que el usuario logueado sea el esperado.
**cypress/pages/demoqa/LoginPage.js** Encapsula acciones típicas: escribir usuario/contraseña, hacer clic en Login y leer el mensaje de error.
**cypress/pages/demoqa/registerPage.js** sirve para automatizar la creación de un usuario
**cypress/pages/demoqa/SucessPage.js** Modela la pantalla de confirmación que aparece después de enviar el formulario de registro.
Permite validar que el mensaje de éxito efectivamente se muestre.
**cypress\pages\lambdatest\InputFormPage.js** Page Object Model (POM) para el formulario de LambdaTest Input Form.busca la URL en cypress.env.json bajo la clave url_lambdatest_form.

Si no existe, usa la URL por defecto.para poder cambiar entornos (DEV, TST, PROD) sin tocar el código. cada campo del formulario representado por su id (#name, #inputEmail4, etc.). cerrar cokies, asegura que el form este visible 


- **Background**: crea un usuario válido por API antes de cada escenario.
- **Scenario Outline 1 – Login con credenciales válidas**: usa el usuario creado dinámicamente.
- **Scenario Outline 2 – Login con usuario no registrado**: prueba login inválido con datos generados que no se registran.

✅ **cypress/journeys/step_definitions/ui/bookstore_login.steps.js**
Step definitions que:
- Generan credenciales aleatorias con `faker`.
- Llaman al endpoint **POST /Account/v1/User** para crear el usuario.
- Guardan las credenciales en variables de entorno de Cypress para que los escenarios las consuman.
- Automatizan el login en la interfaz y validan perfil o mensaje de error.

Creé la carpeta **`ui`** para mantener separados estos pasos de interfaz de usuario de otros steps del proyecto, evitando colisiones de nombres.


✅ **cypress/pages/demoqa/ProfilePage.js**
Page Object para leer el nombre de usuario que aparece en la página de perfil después del login.

👉 **Variables de entorno**

En `cypress.env.json` ya existían varias claves. Se agregaron dos para esta nueva funcionalidad:

{
  "DEV": {
    "url_bookstore": "https://demoqa.com/login",
    "url_bookstore_api": "https://demoqa.com/Account/v1"
  },
  "TST": {
    "url_bookstore": "https://demoqa.com/login",
    "url_bookstore_api": "https://demoqa.com/Account/v1"
  }
}

Durante la ejecución se generan y almacenan dinámicamente:
- `BOOK_USER` y `BOOK_PASS` → usuario y contraseña válidos creados por API.
- `BOOK_USER_UNREG` y `BOOK_PASS_UNREG` → credenciales generadas pero no registradas, usadas en el escenario inválido.

👉 **Flujo de los escenarios**

**Background**
- Genera usuario y password aleatorios.
- Llama al API `/Account/v1/User` para registrar el usuario.
- Genera otro par de credenciales no registradas.

**Scenario Outline: Login con credenciales válidas**
- Usa las variables `BOOK_USER` y `BOOK_PASS`.
- Abre la página de login.
- Completa el formulario y valida que aparece el perfil con el usuario.

**Scenario Outline: Login con usuario no registrado**
- Usa `BOOK_USER_UNREG` y `BOOK_PASS_UNREG`.
- Intenta login y valida el mensaje *Invalid username or password!*.

👉 **Ejecución**

Instalar dependencias:
npm install

Abrir Cypress en modo interactivo (entorno DEV):
npx cypress open --e2e --browser chrome -e ENV=DEV

Ejecución en modo headless:
npx cypress run --spec cypress/journeys/features/e2e/bookstore_login.feature -e ENV=DEV --browser chrome

✍️ **Resumen**
Este README explica las carpetas del proyecto base, los **archivos nuevos** que se agregaron para la automatización de Book Store, las **variables de entorno** utilizadas y el funcionamiento de los **Scenario Outline** que crean y utilizan usuarios dinámicos.





