create sequence users_userid_seq;

create table users
(
    id_user   integer not null default nextval('users_userid_seq'),
    username  text    not null,
    password  text    not null,
    auto_save text,
    constraint user_pk primary key (id_user)
);

alter sequence users_userid_seq owned by users.id_user;


create sequence saves_id_seq;

create table saves
(
    id        integer not null default nextval('saves_id_seq'),
    user_id   integer not null,
    title     text    not null,
    init_date integer not null,
    content   text    not null,
    constraint saves_pk primary key (id),
    constraint user_fk foreign key (user_id)
        references users(id_user)
);

alter sequence saves_id_seq owned by saves.id;