SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE DATABASE IF NOT EXISTS trainingparty_infra;
USE trainingparty_infra;


CREATE TABLE IF NOT EXISTS `belote` (
  `id` int(11) NOT NULL,
  `teamName` varchar(255) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE IF NOT EXISTS `belotescore` (
  `id` int(11) NOT NULL,
  `manche` int(11) NOT NULL,
  `team1` varchar(255) NOT NULL,
  `team2` varchar(255) NOT NULL,
  `score1` int(11) NOT NULL,
  `score2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE IF NOT EXISTS `blindtestgame` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `PP` varchar(255) NOT NULL,
  `score` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `blindtestteam` (
  `id` int(11) NOT NULL,
  `equipe` varchar(100) NOT NULL,
  `joueurs` varchar(255) NOT NULL,
  `score` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE IF NOT EXISTS `game` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `PP` varchar(255) NOT NULL,
  `score` int(11) DEFAULT 0,
  `isToPlay` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE IF NOT EXISTS `shots` (
  `id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `turn_number` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE IF NOT EXISTS `shot_quilles` (
  `id` int(11) NOT NULL,
  `shot_id` int(11) NOT NULL,
  `quille` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `belote` ADD PRIMARY KEY (`id`);
ALTER TABLE `belotescore` ADD PRIMARY KEY (`id`);
ALTER TABLE `blindtestgame` ADD PRIMARY KEY (`id`);
ALTER TABLE `blindtestteam` ADD PRIMARY KEY (`id`);
ALTER TABLE `game` ADD PRIMARY KEY (`id`);
ALTER TABLE `shots` ADD PRIMARY KEY (`id`), ADD KEY `player_id` (`player_id`);
ALTER TABLE `shot_quilles` ADD PRIMARY KEY (`id`), ADD KEY `shot_id` (`shot_id`);

ALTER TABLE `belote` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
ALTER TABLE `belotescore` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
ALTER TABLE `blindtestgame` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `blindtestteam` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `game` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3446;
ALTER TABLE `shots` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=330;
ALTER TABLE `shot_quilles` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=462;

ALTER TABLE `shots` ADD CONSTRAINT `shots_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `game` (`id`);
ALTER TABLE `shot_quilles` ADD CONSTRAINT `shot_quilles_ibfk_1` FOREIGN KEY (`shot_id`) REFERENCES `shots` (`id`);

COMMIT;
