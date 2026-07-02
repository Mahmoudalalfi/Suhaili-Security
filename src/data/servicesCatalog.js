const CDN = 'https://res.cloudinary.com/df7obwqcy/image/upload'

/** Canonical order of services — merged IDs are the single card shown in the tab */
export const SERVICES_ORDER = [
  // Sicherheitsdienste / Security Services (12 cards)
  'objectProtection',
  'plantSecurity',
  'constructionSites',
  'eventSecurity',
  'personalProtection',    // covers VIP + valuables transport
  'patrolService',
  'receptionService',
  'doorman',
  'interventionNight',     // covers alarm response + night security + key holding
  'storeDetective',
  'parkingLogistics',      // covers parking garage + logistics/warehouse
  'clinicSecurity',

  // Sicherheitstechnik / Security Technology (5 cards)
  'cctvSurveillance',
  'alarmFireIntrusion',        // covers alarm systems + fire alarm + intrusion detection
  'accessTimeBarrierIntercom', // covers access control + time attendance + barrier + intercom
  'securityLighting',
  'controlCenter',

  // Baustellenservice / Construction Site Services (2 cards)
  'constructionSiteControl',   // covers monitoring + access control + vehicle control
  'materialTheftDoc',          // covers material monitoring + theft protection + documentation

  // Empfang & Concierge / Reception & Concierge (3 cards)
  'conciergeService',
  'visitorBadgeReception',     // covers visitor reception + visitor badges + visitor management
  'communicationsDesk',        // covers telephone + mail/package + supplier screening

  // Besondere Dienstleistungen / Special Services (4 cards)
  'embassySecurity',
  'criticalInfrastructure',
  'consultingRisk',            // covers security consulting + risk analysis + security concepts
  'evacuationPlanning',
]

export const SERVICE_HERO_BY_ID = {
  // Sicherheitsdienste
  objectProtection:          `${CDN}/v1782971473/ProjectHome1_od6eox.png`,
  plantSecurity:             `${CDN}/v1782960777/plantSecurity_fmqi7y.png`,
  constructionSites:         `${CDN}/v1782953343/Construction_Site_Security_oioa02.png`,
  eventSecurity:             `${CDN}/v1782971538/ProjectHome2_y1oeky.png`,
  personalProtection:        `${CDN}/v1782968569/VIP_ucjad9.png`,
  patrolService:             `${CDN}/v1777654922/svc-patrol_gh4fwc.png`,
  receptionService:          `${CDN}/v1777654892/svc-reception_vlgk7v.png`,
  doorman:                   `${CDN}/v1777654897/svc-doorman_np8wa2.png`,
  interventionNight:         `${CDN}/v1777654893/svc-night-security_mmbdge.png`,
  storeDetective:            `${CDN}/v1782968139/retailDetective_vu7prj.png`,
  parkingLogistics:          `${CDN}/v1782957839/logisticsSecurity_ujyb60.png`,
  clinicSecurity:            `${CDN}/v1782960976/clinicSecurity_dlcwou.png`,

  // Sicherheitstechnik
  cctvSurveillance:          `${CDN}/v1777654909/svc-cctv_mnd1ob.png`,
  alarmFireIntrusion:        `${CDN}/v1782953956/Alarm_Systems_mhpv5u.png`,
  accessTimeBarrierIntercom: `${CDN}/v1782954717/intercomSystems_gmh04y.png`,
  securityLighting:          `${CDN}/v1782958015/securityLighting_mv0ruj.png`,
  controlCenter:             `${CDN}/v1782961032/controlCenter_otxjxs.png`,

  // Baustellenservice
  constructionSiteControl:   `${CDN}/v1782955023/constructionMonitoring_tl546u.png`,
  materialTheftDoc:          `${CDN}/v1782958077/materialMonitoring_mgvubg.png`,

  // Empfang & Concierge
  conciergeService:          `${CDN}/v1782958581/conciergeService_qzw4z0.png`,
  visitorBadgeReception:     `${CDN}/v1782959856/visitorBadges_owqzza.png`,
  communicationsDesk:        `${CDN}/v1782958992/telephoneService_newuyq.png`,

  // Besondere Dienstleistungen
  embassySecurity:           `${CDN}/v1782969087/Embassies_agzj3t.png`,
  criticalInfrastructure:    `${CDN}/v1782959577/criticalInfrastructure_u3poga.png`,
  consultingRisk:            `${CDN}/v1782969565/Consulter_ud9hxl.png`,
  evacuationPlanning:        `${CDN}/v1782959666/evacuationPlanning_mivlbc.png`,
}
