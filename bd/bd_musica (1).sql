-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2024 a las 16:53:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_musica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `music`
--

CREATE TABLE `music` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `audioFile` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `music`
--

INSERT INTO `music` (`id`, `title`, `author`, `type`, `description`, `audioFile`) VALUES
(21, 'Santo(Handel)', 'Jose', 'Canto al Santo', 'Primera estrofa coro, solista1, solista2, coro', 'uploads\\c8b74b8e26fc60ec0f136cd5cf6548c7'),
(22, 'La Elegida', 'Maria', 'Cantos a la Virgen Maria', 'coro todas las estrofas', 'uploads\\7d3f0bfa4306db4942eb2b8f10361472'),
(23, 'Ven a la Fiesta', 'Roberto', 'Cantos de Entrada', 'coro, solista, coro, solista, coro', 'uploads\\45c8360f0bbd0a2ef57b5b9c349cdda3'),
(24, 'Prueba', 'Raul', 'Latino', 'musica de prueba ', 'uploads\\434cb6ad8262025df1bf175327003e3d');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `email`, `password`) VALUES
(1, 'a', 'a@a.com', '8giHyh9xBZuDhjt2PSZJ7uSh7CTL7ik7lpt99Y'),
(2, 'carlos', 'daniel14u.ccg@gmail.com', '$2a$05$4ZSjD6svbtzqoJIIGx.Z6.ZY9AuRnBkgOia/lolG6zF2OhXS0otvW'),
(25, 'b', 'carlos14u.ccg@gmail.com', '$2a$05$1saBT.QBjrrLZosnU9OziuMvOxY2d7/8zkIyeVGJZ8g8mcs/HWM.K'),
(26, 'admin', 'admin14@gmail.com', '$2a$05$L5iJrn/PDxZEhh2b4ucexOtMRh9f98ydJas/mLlRUA03gTxseyOT2'),
(27, 'prueba2', 'prueba@prueba.com', '$2a$05$ErgLoT29u6tEABwAQzuiGuxfH/EVWe6p.RiKE5yP64aKGiQwH0kuG'),
(28, 'pruebaFinal', 'pruebaFinal@gmail.com', '$2a$05$I1pvKUxw3IKmYqvAvLlfYOuVtm3BH.jshB/RihO9DV9SGHTAkNl8G'),
(34, 'UsuarioPrueba', 'Usuario@gmail.com', '$2a$05$T4kKyKjCmSCRWhdOhywNRu32KSklWsrdc77Ao2GHc.0VjSxwufNVe'),
(35, 'Armandos', 'armandos@gmail.com', '$2a$05$7avmI8tTAEjojojitoiTmOJAgBepDMexQpDAskGpJ.toVIKdDcE7i'),
(36, 'Roberto', 'roberto@gmail', '$2a$05$pY4WN7doEdB2v4lOyxAllu8lHwjeUj6VBsPr/QhYgoAQX.b7fcA0i');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `music`
--
ALTER TABLE `music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
