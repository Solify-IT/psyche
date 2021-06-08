import { GraphGroup, wrapError } from '@types';
import { Patient } from 'domain/model';
import IPatientPresenter from 'app/presenter/patientPresenter';
import IPatientRepository from 'app/repository/patientRepository';
import Record from 'domain/model/record';
import InvalidDataError from 'utils/errors/InvalidDataError';
import motivos from 'fixtures/abuseMotives';

export default class PatientInteractor {
  patientRepository: IPatientRepository;

  patientPresenter: IPatientPresenter;

  constructor(patientRepository: IPatientRepository, patientPresenter : IPatientPresenter) {
    this.patientPresenter = patientPresenter;
    this.patientRepository = patientRepository;
  }

  async register(data: Patient[] | Patient) : Promise<Record> {
    const patients : Patient[] = (!Array.isArray(data)) ? [data] : data;
    const [result, error] = await wrapError(this.patientRepository.register(patients));

    if (error) {
      throw error;
    }
    return this.patientPresenter.record(result);
  }

  async getAll(): Promise<Patient[]> {
    const [patients, error] = await wrapError(this.patientRepository.findAll());

    if (error) {
      throw error;
    }

    return this.patientPresenter.findAll(patients);
  }

  async getRecord(id: number) : Promise<Record> {
    const [record, error] = await wrapError(this.patientRepository.findRecord(id));

    if (error) {
      throw error;
    }
    return this.patientPresenter.record(record);
  }

  async canalize(patients: Patient[]) : Promise<any> {
    console.log(patients);
    const [result, error] = await wrapError(this.patientRepository.canalize(patients));

    if (error) {
      throw error;
    }
    return this.patientPresenter.canalize(result);
  }

  async updateDateAt(recordId: number): Promise<Record> {
    const [record, error] = await wrapError(this.patientRepository.updateDateAt(recordId));

    if (error) {
      throw error;
    }

    return this.patientPresenter.record(record);
  }

  async archiveRecord(id: number) : Promise<Record> {
    const [record, error] = await wrapError(this.patientRepository.archiveRecord(id));
    if (error) {
      throw error;
    }
    return this.patientPresenter.archiveRecord(record);
  }

  async getPatientStatistics(startDate: Date, endDate: Date) : Promise<any> {
    if (startDate && endDate) {
      // #region Abuso Sexual
      const [sexualAbuseAge, sexualAbuseAgeError] = await wrapError(
        this.patientRepository.getAgeGraph(motivos[0].name, startDate, endDate),
      );
      if (sexualAbuseAgeError) {
        throw sexualAbuseAgeError;
      }

      const [sexualAbuseGender, sexualAbuseGenderError] = await wrapError(
        this.patientRepository.getGenderGraph(motivos[0].name, startDate, endDate),
      );
      if (sexualAbuseGenderError) {
        throw sexualAbuseGenderError;
      }

      const [sexualAbuseFirstTime, sexualAbuseFirstTimeError] = await wrapError(
        this.patientRepository.getAbuseFirstTimeGraph(motivos[0].name, startDate, endDate),
      );
      if (sexualAbuseFirstTimeError) {
        throw sexualAbuseFirstTimeError;
      }

      const [sexualAbuseType, sexualAbuseTypeError] = await wrapError(
        this.patientRepository.getAbuseTypeGraph(motivos[0].name, startDate, endDate),
      );
      if (sexualAbuseTypeError) {
        throw sexualAbuseTypeError;
      }

      const [sexualAbuseStatus, sexualAbuseStatusError] = await wrapError(
        this.patientRepository.getStatusGraph(motivos[0].name, startDate, endDate),
      );
      if (sexualAbuseStatusError) {
        throw sexualAbuseStatusError;
      }

      const [sexualAbuseLegalProceeding, sexualAbuseLegalProceedingError] = await wrapError(
        this.patientRepository.getLegalProceedingsGraph(motivos[0].name, startDate, endDate),
      );
      if (sexualAbuseLegalProceedingError) {
        throw sexualAbuseLegalProceedingError;
      }

      const sexualAbuseGroup : GraphGroup = {
        title: 'Abuso Sexual',
        graphs: [
          sexualAbuseAge,
          sexualAbuseGender,
          sexualAbuseFirstTime,
          sexualAbuseType,
          sexualAbuseStatus,
          sexualAbuseLegalProceeding,
        ],
      };
      // #endregion
      // #region Violencia Familiar
      const [domesticViolenceAge, domesticViolenceAgeError] = await wrapError(
        this.patientRepository.getAgeGraph(motivos[1].name, startDate, endDate),
      );
      if (domesticViolenceAgeError) {
        throw domesticViolenceAgeError;
      }

      const [domesticViolenceGender, domesticViolenceGenderError] = await wrapError(
        this.patientRepository.getGenderGraph(motivos[1].name, startDate, endDate),
      );
      if (domesticViolenceGenderError) {
        throw domesticViolenceGenderError;
      }

      const [domesticViolenceFirstTime, domesticViolenceFirstTimeError] = await wrapError(
        this.patientRepository.getAbuseFirstTimeGraph(motivos[1].name, startDate, endDate),
      );
      if (domesticViolenceFirstTimeError) {
        throw domesticViolenceFirstTimeError;
      }

      const [domesticViolenceType, domesticViolenceTypeError] = await wrapError(
        this.patientRepository.getAbuseTypeGraph(motivos[1].name, startDate, endDate),
      );
      if (domesticViolenceTypeError) {
        throw domesticViolenceTypeError;
      }

      const [domesticViolenceStatus, domesticViolenceStatusError] = await wrapError(
        this.patientRepository.getStatusGraph(motivos[1].name, startDate, endDate),
      );
      if (domesticViolenceStatusError) {
        throw domesticViolenceStatusError;
      }

      const [domesticViolenceLegalProceeding,
        domesticViolenceLegalProceedingError] = await wrapError(
        this.patientRepository.getLegalProceedingsGraph(motivos[1].name, startDate, endDate),
      );
      if (domesticViolenceLegalProceedingError) {
        throw domesticViolenceLegalProceedingError;
      }

      const domesticViolenceGroup : GraphGroup = {
        title: 'Violencia Familiar',
        graphs: [
          domesticViolenceAge,
          domesticViolenceGender,
          domesticViolenceFirstTime,
          domesticViolenceType,
          domesticViolenceStatus,
          domesticViolenceLegalProceeding,
        ],
      };
      // #endregion
      // #region Trastornos mentales
      const [mentalDisordersAge, mentalDisordersAgeError] = await wrapError(
        this.patientRepository.getAgeGraph(motivos[2].name, startDate, endDate),
      );
      if (mentalDisordersAgeError) {
        throw mentalDisordersAgeError;
      }

      const [mentalDisordersGender, mentalDisordersGenderError] = await wrapError(
        this.patientRepository.getGenderGraph(motivos[2].name, startDate, endDate),
      );
      if (mentalDisordersGenderError) {
        throw mentalDisordersGenderError;
      }

      const [mentalDisordersFirstTime, mentalDisordersFirstTimeError] = await wrapError(
        this.patientRepository.getAbuseFirstTimeGraph(motivos[2].name, startDate, endDate),
      );
      if (mentalDisordersFirstTimeError) {
        throw mentalDisordersFirstTimeError;
      }

      const [mentalDisordersType, mentalDisordersTypeError] = await wrapError(
        this.patientRepository.getAbuseTypeGraph(motivos[2].name, startDate, endDate),
      );
      if (mentalDisordersTypeError) {
        throw mentalDisordersTypeError;
      }

      const [mentalDisordersStatus, mentalDisordersStatusError] = await wrapError(
        this.patientRepository.getStatusGraph(motivos[2].name, startDate, endDate),
      );
      if (mentalDisordersStatusError) {
        throw mentalDisordersStatusError;
      }

      const [mentalDisordersLegalProceeding, mentalDisordersLegalProceedingError] = await wrapError(
        this.patientRepository.getLegalProceedingsGraph(motivos[2].name, startDate, endDate),
      );
      if (mentalDisordersLegalProceedingError) {
        throw mentalDisordersLegalProceedingError;
      }

      const mentalDisordersGroup : GraphGroup = {
        title: 'Trastornos Mentales',
        graphs: [
          mentalDisordersAge,
          mentalDisordersGender,
          mentalDisordersFirstTime,
          mentalDisordersType,
          mentalDisordersStatus,
          mentalDisordersLegalProceeding,
        ],
      };
      // #endregion

      // #region Discapacidad
      const [disabilityAge, disabilityAgeError] = await wrapError(
        this.patientRepository.getAgeGraph(motivos[3].name, startDate, endDate),
      );
      if (disabilityAgeError) {
        throw disabilityAgeError;
      }

      const [disabilityGender, disabilityGenderError] = await wrapError(
        this.patientRepository.getGenderGraph(motivos[3].name, startDate, endDate),
      );
      if (disabilityGenderError) {
        throw disabilityGenderError;
      }

      const [disabilityFirstTime, disabilityFirstTimeError] = await wrapError(
        this.patientRepository.getAbuseFirstTimeGraph(motivos[3].name, startDate, endDate),
      );
      if (disabilityFirstTimeError) {
        throw disabilityFirstTimeError;
      }

      const [disabilityType, disabilityTypeError] = await wrapError(
        this.patientRepository.getAbuseTypeGraph(motivos[3].name, startDate, endDate),
      );
      if (disabilityTypeError) {
        throw disabilityTypeError;
      }

      const [disabilityStatus, disabilityStatusError] = await wrapError(
        this.patientRepository.getStatusGraph(motivos[3].name, startDate, endDate),
      );
      if (disabilityStatusError) {
        throw disabilityStatusError;
      }

      const [disabilityLegalProceeding, disabilityLegalProceedingError] = await wrapError(
        this.patientRepository.getLegalProceedingsGraph(motivos[3].name, startDate, endDate),
      );
      if (disabilityLegalProceedingError) {
        throw disabilityLegalProceedingError;
      }

      const disabilityGroup : GraphGroup = {
        title: 'Discapacidades',
        graphs: [
          disabilityAge,
          disabilityGender,
          disabilityFirstTime,
          disabilityType,
          disabilityStatus,
          disabilityLegalProceeding,
        ],
      };
      // //#endregion

      // #region Intento de suicidio
      const [suicideAge, suicideAgeError] = await wrapError(
        this.patientRepository.getAgeGraph(motivos[4].name, startDate, endDate),
      );
      if (suicideAgeError) {
        throw suicideAgeError;
      }

      const [suicideGender, suicideGenderError] = await wrapError(
        this.patientRepository.getGenderGraph(motivos[4].name, startDate, endDate),
      );
      if (suicideGenderError) {
        throw suicideGenderError;
      }

      const [suicideFirstTime, suicideFirstTimeError] = await wrapError(
        this.patientRepository.getAbuseFirstTimeGraph(motivos[4].name, startDate, endDate),
      );
      if (suicideFirstTimeError) {
        throw suicideFirstTimeError;
      }

      const [suicideAttempts, suicideAttemptsError] = await wrapError(
        this.patientRepository.getAbuseAttemptsGraph(motivos[4].name, startDate, endDate),
      );
      if (suicideAttemptsError) {
        throw suicideAttemptsError;
      }

      const [suicideStatus, suicideStatusError] = await wrapError(
        this.patientRepository.getStatusGraph(motivos[4].name, startDate, endDate),
      );
      if (suicideStatusError) {
        throw suicideStatusError;
      }

      const [suicideMotive, suicideMotiveError] = await wrapError(
        this.patientRepository.getAbuseMotiveGraph(motivos[4].name, startDate, endDate),
      );
      if (suicideMotiveError) {
        throw suicideMotiveError;
      }
      const suicideGroup : GraphGroup = {
        title: 'Intento de suicidios',
        graphs: [
          suicideAge,
          suicideGender,
          suicideFirstTime,
          suicideAttempts,
          suicideStatus,
          suicideMotive,
        ],
      };
      // //#endregion

      // #region  Autolesiones
      const [selfInjuringAge, selfInjuringAgeError] = await wrapError(
        this.patientRepository.getAgeGraph(motivos[5].name, startDate, endDate),
      );
      if (selfInjuringAgeError) {
        throw selfInjuringAgeError;
      }

      const [selfInjuringGender, selfInjuringGenderError] = await wrapError(
        this.patientRepository.getGenderGraph(motivos[5].name, startDate, endDate),
      );
      if (selfInjuringGenderError) {
        throw selfInjuringGenderError;
      }

      const [selfInjuringFirstTime, selfInjuringFirstTimeError] = await wrapError(
        this.patientRepository.getAbuseFirstTimeGraph(motivos[5].name, startDate, endDate),
      );
      if (selfInjuringFirstTimeError) {
        throw selfInjuringFirstTimeError;
      }

      const [selfInjuringType, selfInjuringTypeError] = await wrapError(
        this.patientRepository.getAbuseTypeGraph(motivos[5].name, startDate, endDate),
      );
      if (selfInjuringTypeError) {
        throw selfInjuringTypeError;
      }

      const [selfInjuringStatus, selfInjuringStatusError] = await wrapError(
        this.patientRepository.getStatusGraph(motivos[5].name, startDate, endDate),
      );
      if (selfInjuringStatusError) {
        throw selfInjuringStatusError;
      }

      const [selfInjuringLegalProceeding, selfInjuringLegalProceedingError] = await wrapError(
        this.patientRepository.getLegalProceedingsGraph(motivos[5].name, startDate, endDate),
      );
      if (selfInjuringLegalProceedingError) {
        throw selfInjuringLegalProceedingError;
      }

      const [selfInjuringMotive, selfInjuringMotiveError] = await wrapError(
        this.patientRepository.getAbuseMotiveGraph(motivos[5].name, startDate, endDate),
      );
      if (selfInjuringMotiveError) {
        throw selfInjuringMotiveError;
      }
      const selfInjuringGroup : GraphGroup = {
        title: 'Autolesiones',
        graphs: [
          selfInjuringAge,
          selfInjuringGender,
          selfInjuringFirstTime,
          selfInjuringType,
          selfInjuringStatus,
          selfInjuringMotive,
          selfInjuringLegalProceeding,
        ],
      };

      // #endregion

      // Graph Group
      const graphGroups : GraphGroup[] = [
        sexualAbuseGroup,
        domesticViolenceGroup,
        selfInjuringGroup,
        mentalDisordersGroup,
        disabilityGroup,
        suicideGroup,
      ];

      const [totalPatients, patientsError] = await wrapError(
        this.patientRepository.getPatientsCountInRange(startDate, endDate),
      );
      if (patientsError) {
        throw patientsError;
      }

      const result = {
        graphGroups,
        totalPatients,
      };
      return result;
    }
    throw new InvalidDataError('Se debe proporcionar una fecha inicio y fin');
  }
}
