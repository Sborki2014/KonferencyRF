class Booking:
    """Заявка на бронирование помещения"""

    STASUSES = ('Новая', 'Мероприятие назначено', 'Завершено')

    def __init__(self, booking_id, room_name, status='Новая'):
        self.id = booking_id
        self.room_name = room_name
        self.status = status

    def change_status(self, new_status):
        if new_status not in self.STASUSES:
            raise ValueError('Недопустимый статус')
        self.status = new_status

    def describe(self):
        return f'Заявка №{self.id}: {self.room_name} ({self.status})'


class Room:
    """Помещение для бронирования"""

    def __init__(self, id, name, room_type):
        self.id = id
        self.name = name
        self.room_type = room_type

    def describe(self):
        return f'{self.name} ({self.room_type})'
