Para correr los test de Cypress, [previamente es necesario tener instalado Node.js](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager) e intalar las dependencias cypress usando el siguiente comando de NPM

```powershell
npm install cypress --save-dev
```

Luego, hay dos opciones para correr los tests, con el navegador de cypress si se desea ejecutar unicamente un test o ejecutar todos los test autoamticamente.
Para visualizar lso test en el navegador se debe ejecutar el siguiente comando:
```powershell
npx cypress open
```

Luego, seleccionar los test E2E y un navegador, todos los test del tipo E2E van a estar dentro de esa carpeta.

La otra alternativa para ejecutar todos los test automaticamente es con el siguiente comando:

```powershell
npm run e2e
```

El cual permite ejecutar todos los test de forma autmatica.
