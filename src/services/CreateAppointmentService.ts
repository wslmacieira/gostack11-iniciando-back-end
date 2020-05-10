import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppErrors';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

/**
 * [x] Recebimento das informações
 * [x] Trataiva de erros/excessões
 * [x] Acesso ao repositório
 */

interface Request {
  provider_id: string;
  date: Date;
}

/**
 * Dependency Invertion (SOLID)
 * S: Single Responsibility Principle
 * D: Dependency Invertion Principle
 */

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date); // regra de negócio

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
