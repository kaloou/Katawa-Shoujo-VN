

-- ============================================================
-- Table des musiques (PostgreSQL)
-- ============================================================

DROP TABLE IF EXISTS music CASCADE;
CREATE TABLE music (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

-- ============================================================
-- Insertion des musiques
-- ============================================================

INSERT INTO music (id, name) VALUES (1, 'Lullaby_of_Open_Eyes.mp3');
INSERT INTO music (id, name) VALUES (2, 'Caged_Heart.mp3');
INSERT INTO music (id, name) VALUES (3, 'Fripperies.mp3');
INSERT INTO music (id, name) VALUES (4, 'School_Days.mp3');
INSERT INTO music (id, name) VALUES (5, 'The_Student_Council.mp3');
INSERT INTO music (id, name) VALUES (6, 'Daylight.mp3');
INSERT INTO music (id, name) VALUES (7, 'Ah_Eh_I_Oh_You.mp3');
INSERT INTO music (id, name) VALUES (8, 'Stride.mp3');
INSERT INTO music (id, name) VALUES (9, 'Out_of_the_Loop.mp3');
INSERT INTO music (id, name) VALUES (10, 'Nocturne.mp3');
INSERT INTO music (id, name) VALUES (11, 'Raindrops_and_Puddles.mp3');
INSERT INTO music (id, name) VALUES (12, 'Concord.mp3');
INSERT INTO music (id, name) VALUES (13, 'Afternoon.mp3');
INSERT INTO music (id, name) VALUES (14, 'Everyday_Fantasy.mp3');
INSERT INTO music (id, name) VALUES (15, 'High_Tension.mp3');
INSERT INTO music (id, name) VALUES (16, 'Standing_Tall.mp3');
INSERT INTO music (id, name) VALUES (17, 'Generic_Happy_Music.mp3');
INSERT INTO music (id, name) VALUES (18, 'Parity.mp3');
INSERT INTO music (id, name) VALUES (19, 'Air_Guitar.mp3');
INSERT INTO music (id, name) VALUES (20, 'Painful_History.mp3');
INSERT INTO music (id, name) VALUES (21, 'Shadow_of_the_Truth.mp3');
INSERT INTO music (id, name) VALUES (22, 'Aria_de_l''Etoile.mp3');
INSERT INTO music (id, name) VALUES (23, 'sfx_crowd_outdoors.mp3');
INSERT INTO music (id, name) VALUES (24, 'Cold_Iron.mp3');
INSERT INTO music (id, name) VALUES (25, 'Moment_of_Decision.mp3');

-- Total: 25 musiques

-- ============================================================
-- Mise à jour de seqtext pour ajouter les musiques
-- ============================================================

-- seqid=1
UPDATE seqtext SET pos = 7, z = 1 WHERE seqid = 1 AND seqserial = 3 AND type = 1; -- Play music_serene
UPDATE seqtext SET pos = 8, z = 10 WHERE seqid = 1 AND seqserial = 33 AND type = 1; -- Stop music (fadeout 10s)

-- seqid=2
UPDATE seqtext SET pos = 7, z = 2 WHERE seqid = 2 AND seqserial = 5 AND type = 1; -- Play music_rain

-- seqid=3
UPDATE seqtext SET pos = 7, z = 3 WHERE seqid = 3 AND seqserial = 2 AND type = 1; -- Play music_happiness

-- seqid=7
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 7 AND seqserial = 9 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=8
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 8 AND seqserial = 4 AND type = 1; -- Play music_normal

-- seqid=11
UPDATE seqtext SET pos = 8, z = 5 WHERE seqid = 11 AND seqserial = 7 AND type = 1; -- Stop music (fadeout 5s)
UPDATE seqtext SET pos = 7, z = 5 WHERE seqid = 11 AND seqserial = 26 AND type = 1; -- Play music_shizune

-- seqid=14
UPDATE seqtext SET pos = 8, z = 0 WHERE seqid = 14 AND seqserial = 10 AND type = 1; -- Stop music (fadeout 0s)
UPDATE seqtext SET pos = 7, z = 5 WHERE seqid = 14 AND seqserial = 67 AND type = 1; -- Play music_shizune
UPDATE seqtext SET pos = 8, z = 6 WHERE seqid = 14 AND seqserial = 88 AND type = 1; -- Stop music (fadeout 6s)

-- seqid=15
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 15 AND seqserial = 4 AND type = 1; -- Play music_normal

-- seqid=20
UPDATE seqtext SET pos = 7, z = 6 WHERE seqid = 20 AND seqserial = 6 AND type = 1; -- Play music_daily
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 20 AND seqserial = 22 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 5 WHERE seqid = 20 AND seqserial = 3 AND type = 1; -- Play music_shizune
UPDATE seqtext SET pos = 8, z = 5 WHERE seqid = 20 AND seqserial = 60 AND type = 1; -- Stop music (fadeout 5s)
UPDATE seqtext SET pos = 7, z = 7 WHERE seqid = 20 AND seqserial = 71 AND type = 1; -- Play music_nurse

-- seqid=21
UPDATE seqtext SET pos = 7, z = 8 WHERE seqid = 21 AND seqserial = 3 AND type = 1; -- Play music_pearly
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 21 AND seqserial = 32 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 9 WHERE seqid = 21 AND seqserial = 35 AND type = 1; -- Play music_kenji
UPDATE seqtext SET pos = 8, z = 0 WHERE seqid = 21 AND seqserial = 71 AND type = 1; -- Stop music (fadeout 0s)
UPDATE seqtext SET pos = 7, z = 10 WHERE seqid = 21 AND seqserial = 73 AND type = 1; -- Play music_night

-- seqid=22
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 22 AND seqserial = 2 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 22 AND seqserial = 26 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 3 WHERE seqid = 22 AND seqserial = 39 AND type = 1; -- Play music_happiness
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 22 AND seqserial = 121 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 5 WHERE seqid = 22 AND seqserial = 124 AND type = 1; -- Play music_shizune
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 22 AND seqserial = 175 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 22 AND seqserial = 175 AND type = 1; -- Play music_normal
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 22 AND seqserial = 317 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=23
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 23 AND seqserial = 4 AND type = 1; -- Play music_normal
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 23 AND seqserial = 31 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 5 WHERE seqid = 23 AND seqserial = 31 AND type = 1; -- Play music_shizune

-- seqid=25
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 25 AND seqserial = 6 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 5 WHERE seqid = 25 AND seqserial = 45 AND type = 1; -- Play music_shizune

-- seqid=28
UPDATE seqtext SET pos = 7, z = 12 WHERE seqid = 28 AND seqserial = 20 AND type = 1; -- Play music_lilly
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 28 AND seqserial = 125 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 13 WHERE seqid = 28 AND seqserial = 129 AND type = 1; -- Play music_tranquil
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 28 AND seqserial = 164 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 3 WHERE seqid = 28 AND seqserial = 170 AND type = 1; -- Play music_happiness

-- seqid=29
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 29 AND seqserial = 2 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 14 WHERE seqid = 29 AND seqserial = 13 AND type = 1; -- Play music_another

-- seqid=35
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 35 AND seqserial = 1 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 3 WHERE seqid = 35 AND seqserial = 13 AND type = 1; -- Play music_happiness

-- seqid=39
UPDATE seqtext SET pos = 7, z = 9 WHERE seqid = 39 AND seqserial = 6 AND type = 1; -- Play music_kenji

-- seqid=43
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 43 AND seqserial = 11 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 15 WHERE seqid = 43 AND seqserial = 16 AND type = 1; -- Play music_tension
UPDATE seqtext SET pos = 8, z = 0 WHERE seqid = 43 AND seqserial = 27 AND type = 1; -- Stop music (fadeout 0s)
UPDATE seqtext SET pos = 7, z = 9 WHERE seqid = 43 AND seqserial = 30 AND type = 1; -- Play music_kenji
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 43 AND seqserial = 63 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=44
UPDATE seqtext SET pos = 7, z = 6 WHERE seqid = 44 AND seqserial = 2 AND type = 1; -- Play music_daily

-- seqid=48
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 48 AND seqserial = 5 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=49
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 49 AND seqserial = 92 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=50
UPDATE seqtext SET pos = 8, z = 10 WHERE seqid = 50 AND seqserial = 21 AND type = 1; -- Stop music (fadeout 10s)

-- seqid=52
UPDATE seqtext SET pos = 7, z = 16 WHERE seqid = 52 AND seqserial = 5 AND type = 1; -- Play music_emi
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 52 AND seqserial = 21 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 16 WHERE seqid = 52 AND seqserial = 38 AND type = 1; -- Play music_emi

-- seqid=53
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 53 AND seqserial = 37 AND type = 1; -- Stop music (fadeout 1s)

-- seqid=54
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 54 AND seqserial = 2 AND type = 1; -- Play music_normal

-- seqid=55
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 55 AND seqserial = 18 AND type = 1; -- Play music_normal

-- seqid=57
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 57 AND seqserial = 31 AND type = 1; -- Stop music (fadeout 1s)

-- seqid=58
UPDATE seqtext SET pos = 7, z = 13 WHERE seqid = 58 AND seqserial = 2 AND type = 1; -- Play music_tranquil
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 58 AND seqserial = 285 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 58 AND seqserial = 304 AND type = 1; -- Play music_normal

-- seqid=59
UPDATE seqtext SET pos = 7, z = 12 WHERE seqid = 59 AND seqserial = 2 AND type = 1; -- Play music_lilly
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 59 AND seqserial = 52 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=60
UPDATE seqtext SET pos = 7, z = 6 WHERE seqid = 60 AND seqserial = 5 AND type = 1; -- Play music_daily
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 60 AND seqserial = 40 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 17 WHERE seqid = 60 AND seqserial = 46 AND type = 1; -- Play music_comedy
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 60 AND seqserial = 81 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 60 AND seqserial = 88 AND type = 1; -- Play music_normal
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 60 AND seqserial = 109 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=61
UPDATE seqtext SET pos = 7, z = 18 WHERE seqid = 61 AND seqserial = 15 AND type = 1; -- Play music_rin
UPDATE seqtext SET pos = 8, z = 14 WHERE seqid = 61 AND seqserial = 101 AND type = 1; -- Stop music (fadeout 14s)
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 61 AND seqserial = 111 AND type = 1; -- Play music_normal
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 61 AND seqserial = 120 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 18 WHERE seqid = 61 AND seqserial = 120 AND type = 1; -- Play music_rin
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 61 AND seqserial = 160 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=62
UPDATE seqtext SET pos = 7, z = 18 WHERE seqid = 62 AND seqserial = 35 AND type = 1; -- Play music_rin
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 62 AND seqserial = 105 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 7 WHERE seqid = 62 AND seqserial = 113 AND type = 1; -- Play music_nurse
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 62 AND seqserial = 164 AND type = 1; -- Stop music (fadeout 1s)

-- seqid=66
UPDATE seqtext SET pos = 7, z = 7 WHERE seqid = 66 AND seqserial = 3 AND type = 1; -- Play music_nurse
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 66 AND seqserial = 11 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=67
UPDATE seqtext SET pos = 7, z = 19 WHERE seqid = 67 AND seqserial = 2 AND type = 1; -- Play music_soothing
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 67 AND seqserial = 115 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=68
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 68 AND seqserial = 2 AND type = 1; -- Play music_dreamy

-- seqid=71
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 71 AND seqserial = 14 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 16 WHERE seqid = 71 AND seqserial = 15 AND type = 1; -- Play music_emi

-- seqid=73
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 73 AND seqserial = 64 AND type = 1; -- Stop music (fadeout 1s)

-- seqid=76
UPDATE seqtext SET pos = 7, z = 16 WHERE seqid = 76 AND seqserial = 6 AND type = 1; -- Play music_emi

-- seqid=79
UPDATE seqtext SET pos = 7, z = 9 WHERE seqid = 79 AND seqserial = 13 AND type = 1; -- Play music_kenji
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 79 AND seqserial = 140 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=80
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 80 AND seqserial = 2 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 80 AND seqserial = 45 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 8, z = 5 WHERE seqid = 80 AND seqserial = 45 AND type = 1; -- Stop music (fadeout 5s)

-- seqid=86
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 86 AND seqserial = 2 AND type = 1; -- Play music_normal
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 86 AND seqserial = 88 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 20 WHERE seqid = 86 AND seqserial = 93 AND type = 1; -- Play music_hanako

-- seqid=88
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 88 AND seqserial = 14 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 15 WHERE seqid = 88 AND seqserial = 16 AND type = 1; -- Play music_tension
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 88 AND seqserial = 30 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 17 WHERE seqid = 88 AND seqserial = 30 AND type = 1; -- Play music_comedy
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 88 AND seqserial = 124 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 17 WHERE seqid = 88 AND seqserial = 77 AND type = 1; -- Play music_comedy
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 88 AND seqserial = 168 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 5 WHERE seqid = 88 AND seqserial = 170 AND type = 1; -- Play music_shizune
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 88 AND seqserial = 212 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 14 WHERE seqid = 88 AND seqserial = 214 AND type = 1; -- Play music_another
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 88 AND seqserial = 77 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 88 AND seqserial = 264 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 88 AND seqserial = 77 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 17 WHERE seqid = 88 AND seqserial = 343 AND type = 1; -- Play music_comedy
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 88 AND seqserial = 77 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 88 AND seqserial = 368 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 88 AND seqserial = 419 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=89
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 89 AND seqserial = 2 AND type = 1; -- Play music_normal
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 89 AND seqserial = 58 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 20 WHERE seqid = 89 AND seqserial = 63 AND type = 1; -- Play music_hanako

-- seqid=90
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 90 AND seqserial = 8 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 18 WHERE seqid = 90 AND seqserial = 43 AND type = 1; -- Play music_rin
UPDATE seqtext SET pos = 8, z = 3 WHERE seqid = 90 AND seqserial = 213 AND type = 1; -- Stop music (fadeout 3s)

-- seqid=91
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 91 AND seqserial = 30 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 91 AND seqserial = 36 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 91 AND seqserial = 78 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 14 WHERE seqid = 91 AND seqserial = 84 AND type = 1; -- Play music_another
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 91 AND seqserial = 130 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 9 WHERE seqid = 91 AND seqserial = 182 AND type = 1; -- Play music_kenji
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 91 AND seqserial = 199 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 91 AND seqserial = 209 AND type = 1; -- Play music_normal

-- seqid=94
UPDATE seqtext SET pos = 7, z = 12 WHERE seqid = 94 AND seqserial = 2 AND type = 1; -- Play music_lilly
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 94 AND seqserial = 23 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=97
UPDATE seqtext SET pos = 7, z = 16 WHERE seqid = 97 AND seqserial = 10 AND type = 1; -- Play music_emi

-- seqid=99
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 99 AND seqserial = 20 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=100
UPDATE seqtext SET pos = 8, z = 0 WHERE seqid = 100 AND seqserial = 24 AND type = 1; -- Stop music (fadeout 0s)
UPDATE seqtext SET pos = 7, z = 2 WHERE seqid = 100 AND seqserial = 54 AND type = 1; -- Play music_rain
UPDATE seqtext SET pos = 8, z = 0 WHERE seqid = 100 AND seqserial = 107 AND type = 1; -- Stop music (fadeout 0s)
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 100 AND seqserial = 126 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 8, z = 3 WHERE seqid = 100 AND seqserial = 152 AND type = 1; -- Stop music (fadeout 3s)
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 100 AND seqserial = 178 AND type = 1; -- Play music_normal

-- seqid=102
UPDATE seqtext SET pos = 7, z = 21 WHERE seqid = 102 AND seqserial = 2 AND type = 1; -- Play music_sadness
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 102 AND seqserial = 11 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 9 WHERE seqid = 102 AND seqserial = 14 AND type = 1; -- Play music_kenji

-- seqid=103
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 103 AND seqserial = 4 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 17 WHERE seqid = 103 AND seqserial = 15 AND type = 1; -- Play music_comedy
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 103 AND seqserial = 48 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=105
UPDATE seqtext SET pos = 7, z = 5 WHERE seqid = 105 AND seqserial = 6 AND type = 1; -- Play music_shizune

-- seqid=106
UPDATE seqtext SET pos = 7, z = 21 WHERE seqid = 106 AND seqserial = 34 AND type = 1; -- Play music_sadness

-- seqid=109
UPDATE seqtext SET pos = 7, z = 14 WHERE seqid = 109 AND seqserial = 9 AND type = 1; -- Play music_another

-- seqid=111
UPDATE seqtext SET pos = 8, z = 6 WHERE seqid = 111 AND seqserial = 7 AND type = 1; -- Stop music (fadeout 6s)

-- seqid=115
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 115 AND seqserial = 9 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=116
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 116 AND seqserial = 2 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=117
UPDATE seqtext SET pos = 7, z = 6 WHERE seqid = 117 AND seqserial = 2 AND type = 1; -- Play music_daily
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 117 AND seqserial = 19 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=118
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 118 AND seqserial = 2 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=119
UPDATE seqtext SET pos = 7, z = 3 WHERE seqid = 119 AND seqserial = 7 AND type = 1; -- Play music_happiness

-- seqid=121
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 121 AND seqserial = 104 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=122
UPDATE seqtext SET pos = 7, z = 16 WHERE seqid = 122 AND seqserial = 4 AND type = 1; -- Play music_emi

-- seqid=124
UPDATE seqtext SET pos = 7, z = 16 WHERE seqid = 124 AND seqserial = 11 AND type = 1; -- Play music_emi

-- seqid=125
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 125 AND seqserial = 13 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 18 WHERE seqid = 125 AND seqserial = 20 AND type = 1; -- Play music_rin
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 125 AND seqserial = 29 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 19 WHERE seqid = 125 AND seqserial = 42 AND type = 1; -- Play music_soothing
UPDATE seqtext SET pos = 8, z = 4 WHERE seqid = 125 AND seqserial = 206 AND type = 1; -- Stop music (fadeout 4s)
UPDATE seqtext SET pos = 7, z = 3 WHERE seqid = 125 AND seqserial = 212 AND type = 1; -- Play music_happiness
UPDATE seqtext SET pos = 8, z = 8 WHERE seqid = 125 AND seqserial = 223 AND type = 1; -- Stop music (fadeout 8s)

-- seqid=126
UPDATE seqtext SET pos = 7, z = 10 WHERE seqid = 126 AND seqserial = 3 AND type = 1; -- Play music_night

-- seqid=127
UPDATE seqtext SET pos = 7, z = 12 WHERE seqid = 127 AND seqserial = 14 AND type = 1; -- Play music_lilly
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 127 AND seqserial = 78 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 19 WHERE seqid = 127 AND seqserial = 82 AND type = 1; -- Play music_soothing
UPDATE seqtext SET pos = 8, z = 4 WHERE seqid = 127 AND seqserial = 122 AND type = 1; -- Stop music (fadeout 4s)
UPDATE seqtext SET pos = 7, z = 18 WHERE seqid = 127 AND seqserial = 155 AND type = 1; -- Play music_rin
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 127 AND seqserial = 239 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=130
UPDATE seqtext SET pos = 7, z = 12 WHERE seqid = 130 AND seqserial = 8 AND type = 1; -- Play music_lilly

-- seqid=132
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 132 AND seqserial = 10 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 18 WHERE seqid = 132 AND seqserial = 14 AND type = 1; -- Play music_rin
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 132 AND seqserial = 38 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 12 WHERE seqid = 132 AND seqserial = 55 AND type = 1; -- Play music_lilly

-- seqid=133
UPDATE seqtext SET pos = 7, z = 6 WHERE seqid = 133 AND seqserial = 3 AND type = 1; -- Play music_daily

-- seqid=136
UPDATE seqtext SET pos = 7, z = 6 WHERE seqid = 136 AND seqserial = 2 AND type = 1; -- Play music_daily
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 136 AND seqserial = 37 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=138
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 138 AND seqserial = 9 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 138 AND seqserial = 22 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 138 AND seqserial = 53 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 138 AND seqserial = 92 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 18 WHERE seqid = 138 AND seqserial = 125 AND type = 1; -- Play music_rin

-- seqid=141
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 141 AND seqserial = 15 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 8, z = 5 WHERE seqid = 141 AND seqserial = 36 AND type = 1; -- Stop music (fadeout 5s)
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 141 AND seqserial = 47 AND type = 1; -- Play music_normal

-- seqid=143
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 143 AND seqserial = 31 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 143 AND seqserial = 96 AND type = 1; -- Play music_dreamy

-- seqid=145
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 145 AND seqserial = 31 AND type = 1; -- Play music_normal
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 145 AND seqserial = 58 AND type = 1; -- Stop music (fadeout 1s)

-- seqid=146
UPDATE seqtext SET pos = 7, z = 9 WHERE seqid = 146 AND seqserial = 1 AND type = 1; -- Play music_kenji
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 146 AND seqserial = 51 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=150
UPDATE seqtext SET pos = 7, z = 19 WHERE seqid = 150 AND seqserial = 5 AND type = 1; -- Play music_soothing
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 150 AND seqserial = 19 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 14 WHERE seqid = 150 AND seqserial = 33 AND type = 1; -- Play music_another
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 150 AND seqserial = 133 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 150 AND seqserial = 161 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 150 AND seqserial = 191 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=151
UPDATE seqtext SET pos = 7, z = 17 WHERE seqid = 151 AND seqserial = 6 AND type = 1; -- Play music_comedy
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 151 AND seqserial = 74 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 5 WHERE seqid = 151 AND seqserial = 18 AND type = 1; -- Play music_shizune
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 151 AND seqserial = 132 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 13 WHERE seqid = 151 AND seqserial = 132 AND type = 1; -- Play music_tranquil
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 151 AND seqserial = 387 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 151 AND seqserial = 387 AND type = 1; -- Play music_normal
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 151 AND seqserial = 324 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 5 WHERE seqid = 151 AND seqserial = 477 AND type = 1; -- Play music_shizune
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 151 AND seqserial = 593 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 3 WHERE seqid = 151 AND seqserial = 593 AND type = 1; -- Play music_happiness
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 151 AND seqserial = 619 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 17 WHERE seqid = 151 AND seqserial = 621 AND type = 1; -- Play music_comedy
UPDATE seqtext SET pos = 8, z = 0 WHERE seqid = 151 AND seqserial = 634 AND type = 1; -- Stop music (fadeout 0s)
UPDATE seqtext SET pos = 7, z = 5 WHERE seqid = 151 AND seqserial = 18 AND type = 1; -- Play music_shizune
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 151 AND seqserial = 772 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=152
UPDATE seqtext SET pos = 7, z = 3 WHERE seqid = 152 AND seqserial = 11 AND type = 1; -- Play music_happiness
UPDATE seqtext SET pos = 8, z = 0 WHERE seqid = 152 AND seqserial = 59 AND type = 1; -- Stop music (fadeout 0s)
UPDATE seqtext SET pos = 7, z = 3 WHERE seqid = 152 AND seqserial = 67 AND type = 1; -- Play music_happiness
UPDATE seqtext SET pos = 8, z = 4 WHERE seqid = 152 AND seqserial = 84 AND type = 1; -- Stop music (fadeout 4s)
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 152 AND seqserial = 103 AND type = 1; -- Play music_dreamy

-- seqid=153
UPDATE seqtext SET pos = 7, z = 6 WHERE seqid = 153 AND seqserial = 4 AND type = 1; -- Play music_daily
UPDATE seqtext SET pos = 8, z = 0 WHERE seqid = 153 AND seqserial = 17 AND type = 1; -- Stop music (fadeout 0s)
UPDATE seqtext SET pos = 7, z = 9 WHERE seqid = 153 AND seqserial = 23 AND type = 1; -- Play music_kenji

-- seqid=154
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 154 AND seqserial = 6 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 15 WHERE seqid = 154 AND seqserial = 10 AND type = 1; -- Play music_tension

-- seqid=158
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 158 AND seqserial = 3 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=159
UPDATE seqtext SET pos = 7, z = 17 WHERE seqid = 159 AND seqserial = 21 AND type = 1; -- Play music_comedy
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 159 AND seqserial = 75 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 159 AND seqserial = 75 AND type = 1; -- Play music_normal
UPDATE seqtext SET pos = 8, z = 3 WHERE seqid = 159 AND seqserial = 135 AND type = 1; -- Stop music (fadeout 3s)
UPDATE seqtext SET pos = 7, z = 17 WHERE seqid = 159 AND seqserial = 138 AND type = 1; -- Play music_comedy
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 159 AND seqserial = 24 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 7, z = 17 WHERE seqid = 159 AND seqserial = 24 AND type = 1; -- Play music_comedy
UPDATE seqtext SET pos = 8, z = 3 WHERE seqid = 159 AND seqserial = 277 AND type = 1; -- Stop music (fadeout 3s)
UPDATE seqtext SET pos = 7, z = 19 WHERE seqid = 159 AND seqserial = 295 AND type = 1; -- Play music_soothing
UPDATE seqtext SET pos = 8, z = 5 WHERE seqid = 159 AND seqserial = 360 AND type = 1; -- Stop music (fadeout 5s)
UPDATE seqtext SET pos = 7, z = 21 WHERE seqid = 159 AND seqserial = 369 AND type = 1; -- Play music_sadness
UPDATE seqtext SET pos = 8, z = 10 WHERE seqid = 159 AND seqserial = 393 AND type = 1; -- Stop music (fadeout 10s)
UPDATE seqtext SET pos = 7, z = 13 WHERE seqid = 159 AND seqserial = 24 AND type = 1; -- Play music_tranquil
UPDATE seqtext SET pos = 8, z = 4 WHERE seqid = 159 AND seqserial = 425 AND type = 1; -- Stop music (fadeout 4s)
UPDATE seqtext SET pos = 7, z = 5 WHERE seqid = 159 AND seqserial = 24 AND type = 1; -- Play music_shizune
UPDATE seqtext SET pos = 8, z = 8 WHERE seqid = 159 AND seqserial = 478 AND type = 1; -- Stop music (fadeout 8s)
UPDATE seqtext SET pos = 7, z = 22 WHERE seqid = 159 AND seqserial = 483 AND type = 1; -- Play music_twinkle
UPDATE seqtext SET pos = 8, z = 5 WHERE seqid = 159 AND seqserial = 504 AND type = 1; -- Stop music (fadeout 5s)
UPDATE seqtext SET pos = 7, z = 22 WHERE seqid = 159 AND seqserial = 512 AND type = 1; -- Play music_twinkle

-- seqid=160
UPDATE seqtext SET pos = 8, z = 0 WHERE seqid = 160 AND seqserial = 28 AND type = 1; -- Stop music (fadeout 0s)
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 160 AND seqserial = 30 AND type = 1; -- Play music_normal
UPDATE seqtext SET pos = 8, z = 0 WHERE seqid = 160 AND seqserial = 80 AND type = 1; -- Stop music (fadeout 0s)
UPDATE seqtext SET pos = 7, z = 16 WHERE seqid = 160 AND seqserial = 82 AND type = 1; -- Play music_emi
UPDATE seqtext SET pos = 8, z = 0 WHERE seqid = 160 AND seqserial = 156 AND type = 1; -- Stop music (fadeout 0s)
UPDATE seqtext SET pos = 7, z = 21 WHERE seqid = 160 AND seqserial = 156 AND type = 1; -- Play music_sadness
UPDATE seqtext SET pos = 8, z = 3 WHERE seqid = 160 AND seqserial = 168 AND type = 1; -- Stop music (fadeout 3s)
UPDATE seqtext SET pos = 7, z = 6 WHERE seqid = 160 AND seqserial = 172 AND type = 1; -- Play music_daily
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 160 AND seqserial = 250 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 160 AND seqserial = 263 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 160 AND seqserial = 324 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=161
UPDATE seqtext SET pos = 8, z = 0 WHERE seqid = 161 AND seqserial = 108 AND type = 1; -- Stop music (fadeout 0s)
UPDATE seqtext SET pos = 7, z = 18 WHERE seqid = 161 AND seqserial = 139 AND type = 1; -- Play music_rin
UPDATE seqtext SET pos = 8, z = 3 WHERE seqid = 161 AND seqserial = 165 AND type = 1; -- Stop music (fadeout 3s)
UPDATE seqtext SET pos = 7, z = 18 WHERE seqid = 161 AND seqserial = 197 AND type = 1; -- Play music_rin
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 161 AND seqserial = 209 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 161 AND seqserial = 231 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 7, z = 23 WHERE seqid = 161 AND seqserial = 281 AND type = 1; -- Play sfx_crowd_outdoors
UPDATE seqtext SET pos = 7, z = 22 WHERE seqid = 161 AND seqserial = 298 AND type = 1; -- Play music_twinkle
UPDATE seqtext SET pos = 8, z = 3 WHERE seqid = 161 AND seqserial = 366 AND type = 1; -- Stop music (fadeout 3s)

-- seqid=162
UPDATE seqtext SET pos = 7, z = 13 WHERE seqid = 162 AND seqserial = 7 AND type = 1; -- Play music_tranquil
UPDATE seqtext SET pos = 7, z = 4 WHERE seqid = 162 AND seqserial = 47 AND type = 1; -- Play music_normal
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 162 AND seqserial = 89 AND type = 1; -- Stop music (fadeout 2s)

-- seqid=163
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 163 AND seqserial = 13 AND type = 1; -- Play music_dreamy
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 163 AND seqserial = 46 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 14 WHERE seqid = 163 AND seqserial = 93 AND type = 1; -- Play music_another
UPDATE seqtext SET pos = 7, z = 22 WHERE seqid = 163 AND seqserial = 140 AND type = 1; -- Play music_twinkle

-- seqid=164
UPDATE seqtext SET pos = 7, z = 14 WHERE seqid = 164 AND seqserial = 30 AND type = 1; -- Play music_another
UPDATE seqtext SET pos = 8, z = 2 WHERE seqid = 164 AND seqserial = 53 AND type = 1; -- Stop music (fadeout 2s)
UPDATE seqtext SET pos = 7, z = 11 WHERE seqid = 164 AND seqserial = 64 AND type = 1; -- Play music_dreamy

-- seqid=165
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 165 AND seqserial = 3 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 13 WHERE seqid = 165 AND seqserial = 3 AND type = 1; -- Play music_tranquil
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 165 AND seqserial = 39 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 24 WHERE seqid = 165 AND seqserial = 40 AND type = 1; -- Play music_tragic
UPDATE seqtext SET pos = 8, z = 3 WHERE seqid = 165 AND seqserial = 82 AND type = 1; -- Stop music (fadeout 3s)
UPDATE seqtext SET pos = 7, z = 25 WHERE seqid = 165 AND seqserial = 89 AND type = 1; -- Play music_drama
UPDATE seqtext SET pos = 8, z = 3 WHERE seqid = 165 AND seqserial = 142 AND type = 1; -- Stop music (fadeout 3s)
UPDATE seqtext SET pos = 7, z = 21 WHERE seqid = 165 AND seqserial = 177 AND type = 1; -- Play music_sadness
UPDATE seqtext SET pos = 8, z = 0 WHERE seqid = 165 AND seqserial = 220 AND type = 1; -- Stop music (fadeout 0s)
UPDATE seqtext SET pos = 7, z = 9 WHERE seqid = 165 AND seqserial = 242 AND type = 1; -- Play music_kenji
UPDATE seqtext SET pos = 8, z = 1 WHERE seqid = 165 AND seqserial = 262 AND type = 1; -- Stop music (fadeout 1s)
UPDATE seqtext SET pos = 7, z = 15 WHERE seqid = 165 AND seqserial = 276 AND type = 1; -- Play music_tension
