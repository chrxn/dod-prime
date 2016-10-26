// r = require('rethinkdb');
// promise = r.connect({db: 'eyring'});
_ = require('underscore')
rl = require('readline')

fs = require('fs');

var parseYear = {
  76: function(line) {
    parsed = line.match(/^(.{6})(.{11})(.)(.{5})(.)(.{5})(.)(.)(.)(.)...(.{4})(..).(...)(.{4})(...)(...)(.)(.)(.)(.)(.)(.{4})(.)(.)(.)(.)(.)(..)(.)(..)(.)(.)(.{9})(.)(.{4})(.{4})(..)(.)(..)(.{34})(.{20})(.{10}).(...)(.{19})(.{51})(.{28})(...)./)
    result = {}
    parsed.shift()
    codes = ['contractor_code', 'location_codes', 'contract_dept', 'contract_activity',
    'contract_fiscal_year', 'contract_serial', 'walsh_healy_service_act',
    'correction_code', 'reporting_department', 'multi_year_procurement', 'city_code',
    'state_code', 'labor_surplus_area', 'federal_supply_class', 'system_equipment_code',
    'claimant_program', 'coordinated_procurement', 'synopsis_procurement',
    'procurement_action', 'contract_placement', 'small_business', 'negotiated_exception',
    'extent_competition', 'certified_cost', 'type_contract', 'value_engineering',
    'cost_accounting_standards_clause', 'action_year', 'action_month', 'completion_year',
    'completion_month', 'report_month', 'dollar_value', 'range_code', 'purchasing_office',
    'report_no', 'fiscal_year', 'quarter', 'calendar_year','contractor_name',
    'city_name','state_name', 'county_code', 'county_name',
    'federal_supply_classification_description', 'system_equipment_description',
    'federal_information_exchange_system_identification' ]
    while (codes.length > 0) {
      code = codes.shift()
      result[code] = parsed.shift().trim()
    }
    key = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
      I: 9,
      J: -1,
      K: -2,
      L: -3,
      M: -4,
      N: -5,
      O: -6,
      P: -7,
      Q: -8,
      R: -9,
     '}': 0
    }
    var punch = result.dollar_value.match(/\D$|\}$/)
    // console.log(punch)
    result.dollar_value = result.dollar_value.replace(/0*/, '');
    // result.dv = result.dollar_value
    if (punch) {
      var neg = (key[punch[0]] < 0)
      if (neg) {
        var num = key[punch[0]] * -1
      } else {
        var num = key[punch[0]]
      }
      result.dollar_value = result.dollar_value.replace(punch[0], num);
    }
    result.dollar_value = Number(result.dollar_value)
    return result
  },
  84: function(line) { //84-88
    parsed = line.match(/^(.)(.{4})(.{6})(.{32})(.{10})(.{4})(.{4})(.{15})(.{13})(.{6})(.{9})(.{9})(.{30})(.{9})(.{7})(..)(.{10})(.{7})(.{20})(.{5})(.{22})(.{9})(.{9})(..)(.{4})(.{42})(.{3})(.{4})(.{30})(.)(.)(.{9})(.)(.)(.)(.)(.)(.)(.{4})(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(..)(..)(..)(.)(.)(..)(.{4})(.{5}).$/)
    parsed.shift()
    result = {}
    codes = ['reporting_department','report_number', 'contracting_office_code',
    'contracting_office_name', 'identification_key', 'month_key', 'last_change',
    'contract_number', 'mod_order', 'date_of_action', 'establishment_duns_number',
    'headquarters_duns_number', 'headquarters_name', 'ultimate_duns_number',
    'location_code', 'state_country_water_area_code', 'state_country_name',
    'poc_location_code', 'location_name', 'county_province_code', 'county_province_name', 'number_of_actions',
    'total_dollars', 'dollar_range', 'federal_supply_classification_service_code',
    'federal_supply_classification_service_description', 'dod_claimant_program_code',
    'system_equipment_code', 'system_equipment_description', 'consulting_services_contract',
    'multi_year_contract', 'total_multi_year_value', 'foreign_military_sale',
    'kind_of_contracting_action', 'other_defense_agencies_indicator',
    'synopsis', 'reason_not_synopsized', 'method_of_contracting',
    'negotiated_authority', 'extent_of_competition_in_negotiation',
    'position_indicator_1', 'position_indicator_2', 'type_of_contract',
    'offers_solicited', 'offers_received', 'solicitation_procedure',
    'authority_for_other_than_full_open_comp', 'type_of_business',
    'reason_not_awarded_to_small_business', 'small_disadvantaged_business',
    'women_owned_small_business', 'small_business_set_aside_preference',
    'subject_to_labor_standards_statutes', 'certificate_of_current_cost_data',
    'number_of_offerors', 'buy_american_act_percent_difference', 'country_code_for_foreign_product',
    'country_code_for_imported_components', 'contract_financing', 'ethnic_group', 'extent_competed',
    'standard_industrial_class_code', 'commercial_and_govt_entity_code'
  ]
    while (codes.length > 0) {
      code = codes.shift()
      result[code] = parsed.shift().trim()
    }
    // console.log(result)
    key = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
      I: 9,
      J: -1,
      K: -2,
      L: -3,
      M: -4,
      N: -5,
      O: -6,
      P: -7,
      Q: -8,
      R: -9,
     '}': 0,
     '{': 0
    }
    var punch = result.total_dollars.match(/\D$|\}$/)
    // console.log(punch)
    result.total_dollars = result.total_dollars.replace(/0*/, '');
    // result.dv = result.dollar_value
    if (punch) {
      var neg = (key[punch[0]] < 0)
      if (neg) {
        var num = key[punch[0]] * -1
      } else {
        var num = key[punch[0]]
      }
      result.total_dollars = result.total_dollars.replace(punch[0], num);
    }
    // console.log(result.total_dollars)
    // console.log(key[punch[0]])
    result.total_dollars = Number(result.total_dollars)
    return result
  }
}


fs.readdir(process.cwd(), function(err,files){
  files = _.filter(files, (function(name) {
    return name.includes("RG330")
  }))
  files = files.sort()
  while (files.length > 0) {
    file = files.pop()
    parseFile(file, "EYRING")
  }
})
contracts = {}
function parseFile(filename, query) {
  var year = filename.match(/\d\d$/)[0]
  contracts[year] = {}
  var lines = []
  var obj = []
  contracts[year]['size'] = 0
  contracts[year]['contracts'] = []
  contracts[year]['values'] = []
  lr = rl.createInterface({
    input: fs.createReadStream(filename)
  });
  lr.on('line', function (line) {
    if (line.includes(query)){
      if (_.contains([76,77,78,79,80,81,82,83],Number(year))) {
        lines.push(line)
        contract = parseYear['76'](line)
        contracts[year]['contracts'].push(contract)
        contracts[year]['values'].push(contract.dollar_value)
        // contracts[year]['dv'].push(contract.dv)

      } else if (_.contains([84,85,86,87,88],Number(year))) {
        lines.push(line)
        contract = parseYear['84'](line)
        contracts[year]['contracts'].push(contract)
        contracts[year]['values'].push(contract.total_dollars)
        // contracts[year]['dv'].push(contract.dv)
      } else {
        lines.push(line)
      }
      contracts[year]['size'] = contracts[year]['size'] + 1
    }
  });
  // console.log(contracts)
  contracts[year]['text'] = lines
  if (contracts[year]['values']) {
    // console.log("booya")
  }

}

setTimeout(function () {
  var grand_total = 0
  _.each([76,77,78,79,80,81,82,83,84,85,86,87,88], (year) => {
    contracts[year]['total'] = _.reduce(contracts[year]['values'], (memo, num) => {
      return memo + num
    }, 0)
    grand_total = grand_total + contracts[year]['total']

  })
  console.log(contracts)
  console.log('Grand Total: $' + grand_total * 1000)
}, 30000);
