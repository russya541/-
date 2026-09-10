# Pixhawk 2.4.8 — настройки дрона

Пакет параметров и инструкций для контроллера **Pixhawk 2.4.8** (типичный стек: **ArduCopter** + Mission Planner / QGroundControl).

## Состав

| Путь | Назначение |
|------|------------|
| [docs/pixhawk-248/flash-and-setup.md](docs/pixhawk-248/flash-and-setup.md) | **Пошагово:** подключение, прошивка, смена настроек |
| [docs/pixhawk-248/README.md](docs/pixhawk-248/README.md) | Обзор и порядок настройки |
| [docs/pixhawk-248/checklist.md](docs/pixhawk-248/checklist.md) | Чеклист перед первым полётом |
| [params/quad-x-baseline.param](params/quad-x-baseline.param) | Базовые параметры для квадрокоптера X |
| [params/failsafe-gps.param](params/failsafe-gps.param) | Failsafe, GPS, RTL |
| [params/tuning-soft.param](params/tuning-soft.param) | Мягкий стартовый тюнинг PID |

## Быстрый старт

1. Следуйте [пошаговой инструкции](docs/pixhawk-248/flash-and-setup.md): USB → Mission Planner → Install Firmware (ArduCopter / Pixhawk).
2. Выполните калибровки: акселерометр, компас, радио, ESC (если нужно).
3. Загрузите параметры: Config/Tuning → Full Parameter List → Load → выберите файлы из `params/` по порядку: baseline → failsafe-gps → tuning-soft.
4. Сохраните (`Write Params`) и перезагрузите контроллер.
5. Пройдите [чеклист](docs/pixhawk-248/checklist.md) на земле.

## Важно

- Значения — **безопасный старт**, не финальный тюнинг под вашу раму/моторы/пропеллеры.
- Перед изменением критичных параметров (`ARMING_*`, `FS_*`, `FENCE_*`) убедитесь, что понимаете эффект.
- Если нужны другие правки (рама hex/octo, самолёт, PX4, конкретные PID/режимы) — укажите тип рамы, вес, моторы и желаемое поведение.
