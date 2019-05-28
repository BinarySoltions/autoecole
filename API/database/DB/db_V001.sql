-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 27, 2019 at 11:49 PM
-- Server version: 5.7.21
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auto_ecole`
--

-- --------------------------------------------------------

--
-- Table structure for table `adresse`
--

DROP TABLE IF EXISTS `adresse`;
CREATE TABLE IF NOT EXISTS `adresse` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `eleve_id` bigint(20) NOT NULL,
  `numero` int(11) DEFAULT NULL,
  `rue` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `appartement` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `municipalite` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code_postal` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `adresse_eleve_id_foreign` (`eleve_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `adresse`
--

INSERT INTO `adresse` (`id`, `eleve_id`, `numero`, `rue`, `appartement`, `municipalite`, `province`, `code_postal`, `deleted_at`, `created_at`, `updated_at`) VALUES
(3, 3, 123, 'de la seine', '4', 'st foy', 'Québec', 'h1w2s8', NULL, '2019-05-07 05:44:38', '2019-05-07 05:44:38'),
(4, 4, 124, 'Touba', '9', 'dakar', 'Montrreal', 'h1w2s8', NULL, '2019-05-11 09:49:20', '2019-05-11 09:49:20'),
(5, 5, 124, 'Touba', '9', 'dakar', 'Montrreal', 'h1w2s8', NULL, '2019-05-13 07:35:00', '2019-05-13 07:35:00'),
(6, 6, 838, 'chemin sainte foy', '3', 'quebec', 'province.value', 'k7d3k9', NULL, '2019-05-13 07:54:51', '2019-05-13 07:54:51'),
(7, 7, 344, 'montreal', '94', 'saint laurent', 'province.value', 'h2hs3r', NULL, '2019-05-15 06:54:41', '2019-05-15 06:54:41'),
(8, 8, 123, 'mbour cayor', '34', 'Saloum', 'Québec', 'H2H 3S5', NULL, '2019-05-18 09:05:01', '2019-05-25 12:44:45'),
(9, 9, 123, 'Sainte Foy', '3', 'Quebec', 'Québec', 'H12H22', NULL, '2019-05-21 06:34:47', '2019-05-21 08:26:04'),
(10, 10, 23, '234 artj', NULL, 'we', 'Québec', 'drwrrwrw', NULL, '2019-05-25 10:02:47', '2019-05-25 10:02:47'),
(11, 11, 123, 'rue de Seine', '4', 'Sainte Foy', 'Québec', 'W2H2h3', NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(12, 12, 234, 'Rue Arthur Peloquin', '56', 'Montreal', 'Québec', 'H2H2H3', NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48');

-- --------------------------------------------------------

--
-- Table structure for table `adresse_ecole`
--

DROP TABLE IF EXISTS `adresse_ecole`;
CREATE TABLE IF NOT EXISTS `adresse_ecole` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ecole_id` bigint(20) NOT NULL,
  `numero` int(11) DEFAULT NULL,
  `rue` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `appartement` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `municipalite` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code_postal` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `adresse_ecole_ecole_id_foreign` (`ecole_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `adresse_ecole`
--

INSERT INTO `adresse_ecole` (`id`, `ecole_id`, `numero`, `rue`, `appartement`, `municipalite`, `province`, `code_postal`, `created_at`, `updated_at`) VALUES
(2, 11, 123, 'Saint augustin', '3', 'Montreal', 'Québec', 'H2K2K3', '2019-05-21 03:10:37', '2019-05-27 11:51:36');

-- --------------------------------------------------------

--
-- Table structure for table `attestation`
--

DROP TABLE IF EXISTS `attestation`;
CREATE TABLE IF NOT EXISTS `attestation` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `eleve_id` bigint(20) NOT NULL,
  `ecole_id` bigint(20) NOT NULL,
  `personne_responsable_id` bigint(20) DEFAULT NULL,
  `numero` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `signature_responsable` date DEFAULT NULL,
  `signature_eleve` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `resultat_phase_une` int(11) NOT NULL DEFAULT '0',
  `resultat_final` int(11) NOT NULL DEFAULT '0',
  `signature_ecole_phase_une` date DEFAULT NULL,
  `signature_eleve_phase_une` date DEFAULT NULL,
  `personne_responsable2_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attestation`
--

INSERT INTO `attestation` (`id`, `eleve_id`, `ecole_id`, `personne_responsable_id`, `numero`, `signature_responsable`, `signature_eleve`, `created_at`, `updated_at`, `resultat_phase_une`, `resultat_final`, `signature_ecole_phase_une`, `signature_eleve_phase_une`, `personne_responsable2_id`) VALUES
(2, 12, 11, 7, '00223344', '2019-05-27', '2019-05-27', '2019-05-27 16:27:47', '2019-05-28 03:47:45', 2, 3, '2019-05-27', '2019-05-27', 6);

-- --------------------------------------------------------

--
-- Table structure for table `coordonnee`
--

DROP TABLE IF EXISTS `coordonnee`;
CREATE TABLE IF NOT EXISTS `coordonnee` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `eleve_id` bigint(20) NOT NULL,
  `telephone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone_autre` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `coordonnee_eleve_id_foreign` (`eleve_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coordonnee`
--

INSERT INTO `coordonnee` (`id`, `eleve_id`, `telephone`, `telephone_autre`, `deleted_at`, `created_at`, `updated_at`) VALUES
(3, 3, '5252525252', NULL, NULL, '2019-05-07 05:44:38', '2019-05-07 05:44:38'),
(4, 4, '5254444444', NULL, NULL, '2019-05-11 09:49:20', '2019-05-11 09:49:20'),
(5, 5, '5254444444', NULL, NULL, '2019-05-13 07:35:00', '2019-05-13 07:35:00'),
(6, 6, '00999329', NULL, NULL, '2019-05-13 07:54:51', '2019-05-13 07:54:51'),
(7, 7, '12345678567', NULL, NULL, '2019-05-15 06:54:41', '2019-05-15 06:54:41'),
(8, 8, '12234456', NULL, NULL, '2019-05-18 09:05:01', '2019-05-18 09:05:01'),
(9, 9, '1223455666', NULL, NULL, '2019-05-21 06:34:47', '2019-05-21 06:34:47'),
(10, 10, '344455', NULL, NULL, '2019-05-25 10:02:47', '2019-05-25 10:02:47'),
(11, 11, '5453636637', NULL, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(12, 12, '63637883893', NULL, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48');

-- --------------------------------------------------------

--
-- Table structure for table `ecole`
--

DROP TABLE IF EXISTS `ecole`;
CREATE TABLE IF NOT EXISTS `ecole` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `numero` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `raison_social` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nom` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ecole`
--

INSERT INTO `ecole` (`id`, `numero`, `raison_social`, `nom`, `email`, `created_at`, `updated_at`) VALUES
(11, 'A290', 'Pconduite Inc', NULL, 'test@pconduite.com', '2019-05-21 03:10:37', '2019-05-26 07:07:59');

-- --------------------------------------------------------

--
-- Table structure for table `eleve`
--

DROP TABLE IF EXISTS `eleve`;
CREATE TABLE IF NOT EXISTS `eleve` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `prenom` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nom` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero_contrat` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `eleve`
--

INSERT INTO `eleve` (`id`, `prenom`, `nom`, `numero_contrat`, `deleted_at`, `created_at`, `updated_at`) VALUES
(3, 'ousmane editer', 'Dieng', '1232019', '2019-05-24 11:15:19', '2019-05-07 05:44:38', '2019-05-24 11:15:19'),
(4, 'sangue moustapha', 'Mbaye', '1233019', '2019-05-25 10:01:45', '2019-05-11 09:49:20', '2019-05-25 10:01:45'),
(5, 'Mara', 'Deng', '1233019', '2019-05-25 10:01:51', '2019-05-13 07:35:00', '2019-05-25 10:01:51'),
(6, 'Mara', 'diop', '234', '2019-05-24 11:39:29', '2019-05-13 07:54:51', '2019-05-24 11:39:29'),
(7, 'Moussa', 'Thimbo', '12345', '2019-05-25 10:01:54', '2019-05-15 06:54:41', '2019-05-25 10:01:54'),
(8, 'Demba', 'Kandji', '2334', '2019-05-25 13:34:03', '2019-05-18 09:05:01', '2019-05-25 13:34:03'),
(9, 'Omar', 'Ndiaye', '12345', '2019-05-26 07:09:03', '2019-05-21 06:34:47', '2019-05-26 07:09:03'),
(10, 'Diop', 'Moussa', '2344112', '2019-05-26 07:09:18', '2019-05-25 10:02:47', '2019-05-26 07:09:18'),
(11, 'Sangue', 'Mbaye', '039948', NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(12, 'Ousmane', 'Dieng', '9292938', NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48');

-- --------------------------------------------------------

--
-- Table structure for table `eleve_module`
--

DROP TABLE IF EXISTS `eleve_module`;
CREATE TABLE IF NOT EXISTS `eleve_module` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `eleve_id` bigint(20) NOT NULL,
  `module_id` bigint(20) NOT NULL,
  `date_complete` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eleve_module_eleve_id_foreign` (`eleve_id`),
  KEY `eleve_module_module_id_foreign` (`module_id`)
) ENGINE=MyISAM AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `eleve_module`
--

INSERT INTO `eleve_module` (`id`, `eleve_id`, `module_id`, `date_complete`, `created_at`, `updated_at`) VALUES
(4, 3, 2, NULL, '2019-05-07 05:44:38', '2019-05-07 05:44:38'),
(3, 3, 1, '2019-05-19', '2019-05-07 05:44:38', '2019-05-20 02:15:33'),
(5, 4, 1, '2019-05-19', '2019-05-11 09:49:20', '2019-05-20 02:15:33'),
(6, 4, 2, NULL, '2019-05-11 09:49:20', '2019-05-11 09:49:20'),
(7, 4, 3, NULL, '2019-05-11 09:49:20', '2019-05-11 09:49:20'),
(8, 5, 1, '2019-05-19', '2019-05-13 07:35:00', '2019-05-20 02:15:33'),
(9, 5, 2, '2019-05-20', '2019-05-13 07:35:00', '2019-05-20 11:54:43'),
(10, 5, 3, NULL, '2019-05-13 07:35:00', '2019-05-13 07:35:00'),
(11, 6, 1, '2019-05-19', '2019-05-13 07:54:51', '2019-05-20 02:15:33'),
(12, 6, 2, '2019-05-20', '2019-05-13 07:54:51', '2019-05-20 11:54:43'),
(13, 6, 3, NULL, '2019-05-13 07:54:51', '2019-05-13 07:54:51'),
(14, 7, 1, NULL, '2019-05-15 06:54:41', '2019-05-15 06:54:41'),
(15, 7, 2, NULL, '2019-05-15 06:54:41', '2019-05-15 06:54:41'),
(16, 7, 3, NULL, '2019-05-15 06:54:41', '2019-05-15 06:54:41'),
(17, 8, 1, NULL, '2019-05-18 09:05:01', '2019-05-18 09:05:01'),
(18, 8, 2, NULL, '2019-05-18 09:05:01', '2019-05-18 09:05:01'),
(19, 8, 3, NULL, '2019-05-18 09:05:01', '2019-05-18 09:05:01'),
(20, 9, 1, '2019-05-24', '2019-05-21 06:34:47', '2019-05-25 10:16:36'),
(21, 9, 2, NULL, '2019-05-21 06:34:47', '2019-05-21 06:34:47'),
(22, 9, 4, '2019-05-25', '2019-05-21 06:34:47', '2019-05-25 10:04:06'),
(23, 9, 3, '2019-05-25', '2019-05-21 06:34:47', '2019-05-25 09:57:29'),
(24, 9, 5, '2019-05-26', '2019-05-21 06:34:47', '2019-05-25 13:07:11'),
(25, 9, 6, NULL, '2019-05-21 06:34:47', '2019-05-21 06:34:47'),
(26, 9, 7, NULL, '2019-05-21 06:34:47', '2019-05-21 06:34:47'),
(27, 9, 8, NULL, '2019-05-21 06:34:47', '2019-05-21 06:34:47'),
(28, 9, 9, NULL, '2019-05-21 06:34:47', '2019-05-21 06:34:47'),
(29, 10, 1, '2019-05-25', '2019-05-25 10:02:47', '2019-05-25 12:33:17'),
(30, 10, 2, NULL, '2019-05-25 10:02:47', '2019-05-25 10:02:47'),
(31, 10, 4, '2019-05-25', '2019-05-25 10:02:47', '2019-05-25 10:04:06'),
(32, 10, 10, NULL, '2019-05-25 10:02:47', '2019-05-25 10:02:47'),
(33, 10, 11, NULL, '2019-05-25 10:02:47', '2019-05-25 10:02:47'),
(34, 10, 3, NULL, '2019-05-25 10:02:47', '2019-05-25 10:02:47'),
(35, 10, 5, '2019-05-26', '2019-05-25 10:02:47', '2019-05-25 12:53:34'),
(36, 10, 6, NULL, '2019-05-25 10:02:47', '2019-05-25 10:02:47'),
(37, 10, 7, NULL, '2019-05-25 10:02:47', '2019-05-25 10:02:47'),
(38, 10, 8, NULL, '2019-05-25 10:02:47', '2019-05-25 10:02:47'),
(39, 10, 9, NULL, '2019-05-25 10:02:47', '2019-05-25 10:02:47'),
(40, 11, 1, '2019-05-25', '2019-05-26 07:10:42', '2019-05-26 07:11:27'),
(41, 11, 2, '2019-05-26', '2019-05-26 07:10:42', '2019-05-26 07:14:16'),
(42, 11, 4, '2019-05-27', '2019-05-26 07:10:42', '2019-05-26 21:49:05'),
(43, 11, 10, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(44, 11, 11, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(45, 11, 3, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(46, 11, 5, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(47, 11, 13, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(48, 11, 14, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(49, 11, 15, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(50, 11, 16, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(51, 11, 6, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(52, 11, 7, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(53, 11, 17, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(54, 11, 18, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(55, 11, 19, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(56, 11, 20, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(57, 11, 21, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(58, 11, 22, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(59, 11, 23, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(60, 11, 8, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(61, 11, 9, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(62, 11, 24, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(63, 11, 25, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(64, 11, 26, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(65, 11, 27, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(66, 11, 28, NULL, '2019-05-26 07:10:42', '2019-05-26 07:10:42'),
(67, 12, 1, '2019-05-25', '2019-05-26 07:12:48', '2019-05-26 07:13:10'),
(68, 12, 2, '2019-05-26', '2019-05-26 07:12:48', '2019-05-26 07:14:16'),
(69, 12, 4, '2019-05-27', '2019-05-26 07:12:48', '2019-05-26 21:49:05'),
(70, 12, 10, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(71, 12, 11, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(72, 12, 3, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(73, 12, 5, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(74, 12, 13, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(75, 12, 14, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(76, 12, 15, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(77, 12, 16, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(78, 12, 6, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(79, 12, 7, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(80, 12, 17, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(81, 12, 18, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(82, 12, 19, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(83, 12, 20, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(84, 12, 21, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(85, 12, 22, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(86, 12, 23, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(87, 12, 8, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(88, 12, 9, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(89, 12, 24, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(90, 12, 25, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(91, 12, 26, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(92, 12, 27, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48'),
(93, 12, 28, NULL, '2019-05-26 07:12:48', '2019-05-26 07:12:48');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_05_04_212606_create_eleve_table', 1),
(4, '2019_05_04_215353_create_adresse_table', 1),
(5, '2019_05_04_215731_create_ecole_table', 2),
(6, '2019_05_04_220441_create_phase_table', 2),
(7, '2019_05_04_220536_create_module_table', 2),
(8, '2019_05_04_221813_create_personne_responsable_table', 2),
(9, '2019_05_04_231043_create_coordonnee_table', 2),
(16, '2019_05_05_011507_create_adresse-ecole_table', 4),
(11, '2019_05_05_021653_create_attestation_table', 2),
(12, '2019_05_05_151004_create_eleve_module_table', 2),
(13, '2019_05_05_224857_change_col_date_complete_eleve_module_table', 3),
(17, '2019_05_26_213916_add_column_resultatphase1_resultatfinal_attestattion', 5),
(18, '2019_05_27_053421_add_column_pers2_table_attestation', 6),
(19, '2019_05_27_062353_change_column_default_table_attestation', 7);

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
CREATE TABLE IF NOT EXISTS `module` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `phase_id` bigint(20) NOT NULL,
  `nom` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `module_phase_id_foreign` (`phase_id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `module`
--

INSERT INTO `module` (`id`, `phase_id`, `nom`, `type`, `numero`, `created_at`, `updated_at`) VALUES
(1, 1, '1', 'T', 1, '2019-05-06 01:41:47', '2019-05-21 09:34:16'),
(2, 1, '2', 'T', 2, '2019-05-06 01:50:47', '2019-05-21 09:34:34'),
(3, 2, '6', 'T', 6, '2019-05-07 07:11:32', '2019-05-21 09:34:57'),
(4, 1, '3', 'T', 3, '2019-05-20 07:38:29', '2019-05-20 07:38:29'),
(5, 2, 'Sortie 1', 'P', 7, '2019-05-21 03:36:31', '2019-05-21 03:36:31'),
(6, 3, '8', 'T', 12, '2019-05-21 04:14:06', '2019-05-21 04:14:06'),
(7, 3, 'Sortie 5', 'P', 13, '2019-05-21 04:20:36', '2019-05-21 04:20:36'),
(8, 4, '11', 'T', 21, '2019-05-21 04:21:27', '2019-05-21 04:21:27'),
(9, 4, 'Sortie 11', 'P', 22, '2019-05-21 04:23:13', '2019-05-21 04:23:13'),
(10, 1, '4', 'T', 4, '2019-05-25 09:44:13', '2019-05-25 09:44:13'),
(11, 1, '5', 'T', 5, '2019-05-25 09:44:23', '2019-05-25 09:44:23'),
(13, 2, 'Sortie 2', 'P', 8, '2019-05-26 06:58:04', '2019-05-26 06:58:04'),
(14, 2, '7', 'T', 9, '2019-05-26 06:58:53', '2019-05-26 06:58:53'),
(15, 2, 'Sortie 3', 'P', 10, '2019-05-26 07:00:17', '2019-05-26 07:00:17'),
(16, 2, 'Sortie 4', 'P', 11, '2019-05-26 07:00:36', '2019-05-26 07:00:36'),
(17, 3, 'Sortie 6', 'P', 14, '2019-05-26 07:01:22', '2019-05-26 07:01:22'),
(18, 3, '9', 'T', 15, '2019-05-26 07:01:43', '2019-05-26 07:01:43'),
(19, 3, 'Sortie 7', 'P', 16, '2019-05-26 07:02:31', '2019-05-26 07:02:31'),
(20, 3, 'Sortie 8', 'P', 17, '2019-05-26 07:02:50', '2019-05-26 07:02:50'),
(21, 3, '10', 'T', 18, '2019-05-26 07:03:08', '2019-05-26 07:03:08'),
(22, 3, 'Sortie 9', 'P', 19, '2019-05-26 07:03:46', '2019-05-26 07:03:46'),
(23, 3, 'Sortie 10', 'P', 20, '2019-05-26 07:04:05', '2019-05-26 07:04:05'),
(24, 4, 'Sortie 12', 'P', 23, '2019-05-26 07:04:45', '2019-05-26 07:04:45'),
(25, 4, 'Sortie 13', 'P', 24, '2019-05-26 07:04:58', '2019-05-26 07:04:58'),
(26, 4, '12', 'T', 25, '2019-05-26 07:05:16', '2019-05-26 07:05:16'),
(27, 4, 'Sortie 14', 'P', 26, '2019-05-26 07:05:40', '2019-05-26 07:05:40'),
(28, 4, 'Sortie 15', 'P', 27, '2019-05-26 07:06:30', '2019-05-26 07:06:30');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personne_responsable`
--

DROP TABLE IF EXISTS `personne_responsable`;
CREATE TABLE IF NOT EXISTS `personne_responsable` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personne_responsable`
--

INSERT INTO `personne_responsable` (`id`, `nom`, `created_at`, `updated_at`) VALUES
(7, 'Ousmane Dieng', '2019-05-20 10:25:13', '2019-05-20 10:25:13'),
(6, 'Cheikh Mbodji', '2019-05-20 10:21:29', '2019-05-20 10:21:29');

-- --------------------------------------------------------

--
-- Table structure for table `phase`
--

DROP TABLE IF EXISTS `phase`;
CREATE TABLE IF NOT EXISTS `phase` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `phase`
--

INSERT INTO `phase` (`id`, `nom`, `numero`, `created_at`, `updated_at`) VALUES
(1, 'Phase 1', 1, '2019-05-06 01:38:49', '2019-05-25 09:44:50'),
(2, 'Phase 2', 2, '2019-05-07 07:09:52', '2019-05-26 06:58:53'),
(3, 'Phase 3', 3, '2019-05-21 04:14:06', '2019-05-21 04:14:06'),
(4, 'Phase 4', 4, '2019-05-21 04:21:27', '2019-05-21 04:21:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
