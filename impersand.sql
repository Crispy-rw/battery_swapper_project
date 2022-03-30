-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 30, 2022 at 12:16 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `impersand`
--

-- --------------------------------------------------------

--
-- Table structure for table `battery`
--

CREATE TABLE `battery` (
  `id` int(11) NOT NULL,
  `serial_number` int(11) NOT NULL,
  `max_power` int(11) NOT NULL,
  `battery_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `battery`
--

INSERT INTO `battery` (`id`, `serial_number`, `max_power`, `battery_status`) VALUES
(1, 423155, 40, 'motion'),
(2, 4231255, 40, 'available'),
(3, 42313255, 40, 'available');

-- --------------------------------------------------------

--
-- Table structure for table `coordinates`
--

CREATE TABLE `coordinates` (
  `id` int(11) NOT NULL,
  `travel_id` int(11) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coordinates`
--

INSERT INTO `coordinates` (`id`, `travel_id`, `latitude`, `longitude`, `time`) VALUES
(1, 1, '45.577068000', '-121.792390000', '1648600478932'),
(2, 1, '45.577089000', '-121.792438000', '1648600478932'),
(3, 1, '45.577185000', '-121.792468000', '1648601206613'),
(4, 1, '45.586023000', '-121.791761000', '1648601547089'),
(5, 1, '45.586187000', '-121.792575000', '1648601592401');

-- --------------------------------------------------------

--
-- Table structure for table `motobike`
--

CREATE TABLE `motobike` (
  `id` int(11) NOT NULL,
  `platenumber` int(11) NOT NULL,
  `driver_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `motobike`
--

INSERT INTO `motobike` (`id`, `platenumber`, `driver_name`) VALUES
(1, 42313255, 'crispy');

-- --------------------------------------------------------

--
-- Table structure for table `travel`
--

CREATE TABLE `travel` (
  `id` int(11) NOT NULL,
  `battery_id` int(11) NOT NULL,
  `motorbike_id` int(11) NOT NULL,
  `battery_power_start` int(11) NOT NULL,
  `battery_power_end` int(11) DEFAULT NULL,
  `distance` decimal(10,5) NOT NULL,
  `status` varchar(255) NOT NULL,
  `start_time` varchar(255) NOT NULL,
  `end_time` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `travel`
--

INSERT INTO `travel` (`id`, `battery_id`, `motorbike_id`, `battery_power_start`, `battery_power_end`, `distance`, `status`, `start_time`, `end_time`) VALUES
(1, 1, 1, 30, 23, '1.06553', 'stopped', '1648599053115', '1.648623e12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `battery`
--
ALTER TABLE `battery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coordinates`
--
ALTER TABLE `coordinates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `motobike`
--
ALTER TABLE `motobike`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `travel`
--
ALTER TABLE `travel`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `battery`
--
ALTER TABLE `battery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `coordinates`
--
ALTER TABLE `coordinates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `motobike`
--
ALTER TABLE `motobike`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `travel`
--
ALTER TABLE `travel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
