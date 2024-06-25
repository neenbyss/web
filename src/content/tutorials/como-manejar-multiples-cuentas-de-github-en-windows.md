---
title: Cómo Manejar Múltiples Cuentas de GitHub en Windows
description: Aprende a gestionar múltiples cuentas de GitHub en una sola computadora con Windows utilizando SSH y configuraciones de Git.
slug: como-manejar-multiples-cuentas-de-github-en-windows
publishedAt: 2024-06-15
tags: ["fivem", "linux"]
isPublish: true
---


# Cómo Manejar Múltiples Cuentas de GitHub en una Sola Computadora

Si eres desarrollador, probablemente te hayas encontrado con la necesidad de usar múltiples cuentas de GitHub: tal vez una para proyectos personales y otra para proyectos de trabajo. Cambiar entre estas cuentas puede ser un poco complicado si no sabes cómo hacerlo. En este artículo, te mostraré cómo gestionar múltiples cuentas de GitHub en una sola computadora utilizando SSH y configuraciones de Git.

## Paso 1: Generar Llaves SSH para Cada Cuenta

Primero, necesitas generar una llave SSH para cada una de tus cuentas de GitHub. Esto te permitirá autenticarte en los servidores de GitHub sin tener que ingresar tu contraseña cada vez que interactúes con un repositorio.

### Generar una Llave SSH para la Primera Cuenta

1. Abre tu terminal.

2. Genera una nueva llave SSH para tu primera cuenta (reemplaza `email_de_tu_cuenta_1@example.com` con tu correo real):

    ```sh
    ssh-keygen -t ed25519 -C "email_de_tu_cuenta_1@example.com"
    ```

3. Cuando se te pida, guarda la llave con un nombre diferente, por ejemplo: `~/.ssh/id_ed25519_cuenta1`.

### Generar una Llave SSH para la Segunda Cuenta

Repite el proceso para tu segunda cuenta (reemplaza `email_de_tu_cuenta_2@example.com` con tu correo real):

```sh
ssh-keygen -t ed25519 -C "email_de_tu_cuenta_2@example.com"
```

Guarda esta llave con un nombre diferente, por ejemplo: `~/.ssh/id_ed25519_cuenta2`.

### Agregar las Llaves SSH a tu Agente SSH

Después de generar las llaves, necesitas agregar ambas al agente SSH:

```sh
ssh-add ~/.ssh/id_ed25519_cuenta1
ssh-add ~/.ssh/id_ed25519_cuenta2
```

## Paso 2: Configurar el Archivo SSH

Para que SSH sepa qué llave usar para cada cuenta, debemos configurar el archivo SSH `~/.ssh/config`. Si este archivo no existe, créalo.

### Editar el Archivo `~/.ssh/config`

Añade las siguientes configuraciones al archivo `~/.ssh/config`:

```sh
# Cuenta 1
Host github-cuenta1
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_cuenta1

# Cuenta 2
Host github-cuenta2
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_cuenta2
```

## Paso 3: Configurar Git

Ahora, necesitas configurar Git para que use diferentes identidades de usuario en diferentes repositorios. Esto se hace en la configuración local de cada repositorio.

### Configurar Git para la Primera Cuenta

En el directorio de tu primer repositorio, configura el usuario y el correo:

```sh
cd /ruta/a/tu/repositorio1
git config user.name "Tu Nombre Cuenta 1"
git config user.email "email_de_tu_cuenta_1@example.com"
```

### Configurar Git para la Segunda Cuenta

Para el segundo repositorio, repite el proceso:

```sh
cd /ruta/a/tu/repositorio2
git config user.name "Tu Nombre Cuenta 2"
git config user.email "email_de_tu_cuenta_2@example.com"
```

## Paso 4: Clonación y Push de Repositorios

Finalmente, cuando clones repositorios para cada cuenta, utiliza los alias que configuraste en el archivo `~/.ssh/config`.

### Clonar un Repositorio de la Primera Cuenta

```sh
git clone git@github-cuenta1:usuario/repo1.git
```

### Clonar un Repositorio de la Segunda Cuenta

```sh
git clone git@github-cuenta2:usuario/repo2.git
```

## Conclusión

Y eso es todo. Ahora puedes manejar múltiples cuentas de GitHub en una sola computadora sin problemas. Recuerda siempre usar los alias (`github-cuenta1` y `github-cuenta2`) al interactuar con los repositorios. ¡Feliz codificación!