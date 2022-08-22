-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2022 at 11:39 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thoughti`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `itemId` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `itemName` varchar(255) DEFAULT NULL,
  `itemUnitPrice` bigint(20) DEFAULT NULL,
  `itemQuantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`itemId`, `orderId`, `itemName`, `itemUnitPrice`, `itemQuantity`) VALUES
(1, 1, 'item1', 100, 4),
(2, 2, 'item4', 100, 4),
(3, 1, 'item2', 100, 4),
(4, 2, 'item3', 100, 4),
(5, 1, 'item1', 100, 4),
(6, 2, 'item3', 100, 4),
(7, 2, 'item4', 100, 4),
(8, 1, 'item2', 100, 4),
(9, 3, 'item3', 100, 4),
(10, 4, 'item1', 100, 4),
(11, 3, 'item4', 100, 4),
(12, 4, 'item2', 100, 4),
(13, 5, 'item1', 100, 4),
(14, 6, 'item3', 100, 4),
(15, 5, 'item2', 100, 4),
(16, 6, 'item4', 100, 4),
(17, 7, 'item3', 100, 4),
(18, 7, 'item4', 100, 4),
(19, 8, 'item3', 100, 4),
(20, 8, 'item4', 100, 4),
(21, 9, 'item3', 100, 4),
(22, 9, 'item4', 100, 4),
(23, 10, 'item1', 100, 4),
(24, 11, 'item3', 100, 4),
(25, 11, 'item4', 100, 4),
(26, 10, 'item2', 100, 4),
(27, 12, 'item1', 100, 4),
(28, 12, 'item2', 100, 4),
(29, 13, 'item3', 100, 4),
(30, 13, 'item4', 100, 4),
(31, 14, 'item1', 100, 4),
(32, 14, 'item2', 100, 4),
(33, 15, 'item1', 100, 4),
(34, 15, 'item2', 100, 4),
(35, 16, 'item3', 100, 4);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `orderDate` date NOT NULL DEFAULT current_timestamp(),
  `orderStatus` tinyint(2) DEFAULT NULL,
  `collectionOfItems` bigint(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `orderDate`, `orderStatus`, `collectionOfItems`) VALUES
(1, '0000-00-00', 1, 2),
(2, '2022-08-22', 1, 2),
(3, '2022-08-22', 1, 2),
(4, '0000-00-00', 1, 2),
(5, '0000-00-00', 1, 2),
(6, '2022-08-22', 1, 2),
(7, '2022-08-22', 1, 2),
(8, '2022-08-22', 1, 2),
(9, '2022-08-22', 1, 2),
(10, '2022-08-21', 1, 2),
(11, '2022-08-22', 1, 2),
(12, '2022-08-21', 1, 2),
(13, '2022-08-22', 1, 2),
(14, '2022-08-21', 1, 2),
(15, '2022-08-21', 1, 2),
(16, '2022-08-22', 1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`itemId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `itemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
