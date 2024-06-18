---
title: Cómo crear un servidor de FiveM en Linux
description: En este tutorial te enseñaremos a crear un servidor de FiveM en un hosting con Linux.
slug: como-crear-un-servidor-de-fivem-en-linux
publishedAt: 2024-06-15
tags: ["fivem", "linux"]
isPublish: true
---

# Cómo crear un servidor de FiveM en Linux

En este tutorial, te enseñaré cómo empezar tu servidor de FiveM roleplay de una manera muy simple. Este tutorial está dirigido a personas que estén usando una máquina o hosting en Linux, ya que la mayoría de los tutoriales están enfocados en Windows.

## ¿Por qué usar Linux?

Puede que te preguntes por qué usar Linux en lugar de Windows. Aquí te explico algunas ventajas:

- **Menor consumo de recursos:** Linux no tiene una interfaz gráfica que consuma recursos, lo cual es ideal para un servidor.
- **Costo:** Linux es generalmente más barato porque no necesitas pagar licencias como en Windows.
- **Rendimiento:** Linux suele ser más eficiente y estable para servidores.

## Artifacts de FiveM

Los artifacts son el código interno que ejecuta el servidor de FiveM. Es esencial tenerlos actualizados.

1. **Descargar artifacts:**

Ve al siguiente [link](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master) para encontrar la última versión de los artifacts. Copiael enlace del archivo más reciente. Debe ser algo como esto:

```
https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/8552-7b609f5f63ca1ef211abde2fc0dc0d0a90cd9202/fx.tar.xz
```

2. **Crear una carpeta para el servidor:**

```bash
mkdir server
cd server
```

3. **Descargar y extraer artifacts:**

```bash
wget https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/8552-7b609f5f63ca1ef211abde2fc0dc0d0a90cd9202/fx.tar.xz
tar -xvf fx.tar.xz
```

## Base de Datos

Usaremos MariaDB como base de datos.

1. **Instalar MariaDB:**

```bash
sudo apt update
sudo apt install mariadb-server
```

2. **Entrar a MariaDB:**

```bash
sudo mariadb
```

3. **Crear la base de datos:**

```sql
CREATE DATABASE fivem;
```

4. **Crear el usuario:**

```sql
GRANT ALL ON fivem.* TO 'fivem'@'localhost' IDENTIFIED BY 'lapoderosacontraseña' WITH GRANT OPTION;
```

5. **Aplicar los permisos:**

```sql
FLUSH PRIVILEGES;
```

## Configuración del Servidor

Ahora que tenemos lo esencial configurado, vamos a iniciar el txAdmin para empezar a configurar nuestro servidor.

1. **Ejecutar el servidor:**

```bash
sh run.sh
```
