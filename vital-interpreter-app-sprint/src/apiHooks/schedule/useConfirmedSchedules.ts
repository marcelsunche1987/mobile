import { differenceInMilliseconds, isAfter, isBefore } from 'date-fns';
import useFetchDefaultOptions from '../../hooks/useFetchDefaultOptions';
import qs from 'query-string';
import { apiGateWayEndpoint } from '../config';
import { formatDateForAPI, formatDateTimeForAPI } from '../../utils/dateUtil';

interface IConfirmedData {
    centerCode: string;
    centerId: number;
    centerName: string;
    details: any[];
    employeeNo: number;
    firstName: string;
    lastName: string;
    timeZoneCode: string;
    userId: number;
    isApproved: boolean;
    queueName: string;
}

export function useConfirmedScheduleAPI() {
    interface EmailConfirmedSchedulesParams {
        searchString?: string;
        queueId?: number;
        isActive?: boolean;
        centerId?: number;
        beginStartDt?: Date | null;
        endStartDt?: Date | null;
        userId?: number;
    }

    const {
        loading,
        get,
        put,
        post,
        delete: del,
    } = useFetchDefaultOptions(
        `${apiGateWayEndpoint}/api/v2/confirmedSchedule`
    );
    return {
        loading,
        getDetails: async (proposeId: string | number) => {
            const queryParams = `/details?scheduleConfirmedId=${proposeId}`;
            const res = await get(queryParams);
            return res;
        },
        putApprovedConfirmedSchedule: async (props: {
            centerId: number;
            confirmedId: number;
            isApproved: boolean;
            userId: number;
        }) => {
            const res = await put('/approve', props);
            return res;
        },
        put: async ({
            userId,
            confirmedId,
            queueId,
            endTime,
            startTime,
            lunchStartTime = null,
            lunchEndTime = null,
            centerId,
            cancelCodeId,
        }: any) => {
            let raw: any = {
                confirmedId,
                userId,
                queueId,
                centerId,
                cancelCodeId,
                startDt: formatDateTimeForAPI(startTime),
                endDt: formatDateTimeForAPI(endTime),
                lunchStartDt:
                    lunchStartTime && formatDateTimeForAPI(lunchStartTime),
                lunchEndDt: lunchEndTime && formatDateTimeForAPI(lunchEndTime),
            };
            return await put('/update', raw);
        },
        post: async ({ userId, queueId, centerId, comboData }: any) => {
            const { startTime, endTime, lunchStartTime, lunchEndTime } =
                comboData;
            const raw: any = {
                userId: userId,
                scheduleSourceId: 2,
                queueId: queueId,
                StartDt: formatDateTimeForAPI(startTime),
                EndDt: formatDateTimeForAPI(endTime),
                LunchStartDt:
                    lunchStartTime && formatDateTimeForAPI(lunchStartTime),
                LunchEndDt: lunchEndTime && formatDateTimeForAPI(lunchEndTime),
                centerId: centerId,
            };

            return await post('/', raw);
        },
        del: async (scheduleConfirmedId: any) => {
            const raw = {
                scheduleConfirmedId: scheduleConfirmedId,
            };
            return del('/delete', raw);
        },
        email: async (params: EmailConfirmedSchedulesParams) => {
            const queryString = qs.stringify(
                {
                    ...params,
                    isActive:
                        params.isActive === undefined ? true : params.isActive,
                    beginStartDt: params.beginStartDt
                        ? formatDateForAPI(params.beginStartDt)
                        : undefined,
                    endStartDt: params.endStartDt
                        ? formatDateForAPI(params.endStartDt)
                        : undefined,
                },
                { encode: false, skipNull: true }
            );

            return await get('/email?' + queryString);
        },
    };
}

export function useConfirmedSchedulesAPI() {
    const { abort, loading, get } = useFetchDefaultOptions(
        `${apiGateWayEndpoint}/api/v2/confirmedSchedules`
    );
    interface getConfirmedSchedulesParams {
        userId?: number;
        recordsPerPage?: number;
        pageNumber?: number;
        searchString?: string;
        queueId?: number;
        isActive?: boolean;
        centerId?: number;
        sortColumn?: string;
        sortDirection?: string;
        beginStartDt?: Date | null;
        endStartDt?: Date | null;
    }

    interface exportConfirmedSchedulesParams {
        searchString?: string;
        queueId?: number;
        isActive?: boolean;
        centerId?: number;
        sortColumn?: string;
        sortDirection?: string;
        beginStartDt?: Date | null;
        endStartDt?: Date | null;
        exportType: 'Word' | 'Excel';
    }

    return {
        abort,
        loading,
        get: async ({
            userId,
            recordsPerPage,
            pageNumber,
            searchString,
            queueId,
            isActive,
            centerId,
            sortColumn,
            sortDirection,
            beginStartDt,
            endStartDt,
        }: getConfirmedSchedulesParams) => {
            const queryString = qs.stringify(
                {
                    RecordsPerPage: recordsPerPage || 10,
                    PageNumber: pageNumber || 1,
                    SearchString: searchString,
                    SortColumn: sortColumn,
                    SortDirection: sortDirection || 'asc',
                    IsActive: isActive ?? true,
                    QueueId: queueId,
                    CenterId: centerId,
                    UserId: userId,
                    BeginStartDt: beginStartDt
                        ? formatDateForAPI(beginStartDt)
                        : undefined,
                    EndStartDt: endStartDt
                        ? formatDateForAPI(endStartDt)
                        : undefined,
                },
                { encode: false, skipNull: true }
            );

            const res = await get('?' + queryString);

            if (res?.schedules) {
                res.schedules = res?.schedules?.map(
                    (schedule: IConfirmedData) => {
                        if (schedule?.details.length === 1)
                            return {
                                ...schedule,
                                ...schedule?.details[0],
                                subRows: [],
                            };
                        if (schedule?.details.length > 1) {
                            let startDt: Date | null = null;
                            let endDt: Date | null = null;
                            let lunchStartDt: Date | null = null;
                            let lunchEndDt: Date | null = null;
                            let shiftLengthHours: number = 0;
                            const subRows = schedule?.details.map((detail) => {
                                const start = new Date(detail?.startDt);
                                const end = new Date(detail?.endDt);
                                const lunchStart = detail?.lunchStartDt
                                    ? new Date(detail?.lunchStartDt)
                                    : null;
                                const lunchEnd = detail?.lunchEndDt
                                    ? new Date(detail?.lunchEndDt)
                                    : null;
                                shiftLengthHours += detail?.workedHours || 0;
                                if (!startDt || isBefore(start, startDt))
                                    startDt = start;
                                if (!endDt || isAfter(end, endDt)) endDt = end;
                                if (!lunchStartDt) lunchStartDt = lunchStart;
                                if (!lunchEndDt) lunchEndDt = lunchEnd;
                                return { ...schedule, ...detail };
                            });
                            return {
                                ...schedule,
                                startDt,
                                endDt,
                                lunchStartDt,
                                lunchEndDt,
                                subRows,
                                shiftLengthHours,
                                workedHours: shiftLengthHours,
                                queueName: schedule?.queueName,
                            };
                        }
                    }
                );
                return res;
            }
            // this is returned since the processing above is assumed. Type script complained when I just sent error. Tried a few fixes may want to circle back.
            if (!res) {
                return null;
            }
            return {
                schedules: [],
                totalRecords: 0,
                error: res?.error || 'call failed',
            };
        },
        export: async (params: exportConfirmedSchedulesParams) => {
            const queryString = qs.stringify(
                {
                    ...params,
                    isActive:
                        params.isActive === undefined ? true : params.isActive,
                    beginStartDt: params.beginStartDt
                        ? formatDateForAPI(params.beginStartDt)
                        : undefined,
                    endStartDt: params.endStartDt
                        ? formatDateForAPI(params.endStartDt)
                        : undefined,
                },
                { encode: false, skipNull: true }
            );
            return await get('/export?' + queryString);
        },
    };
}
