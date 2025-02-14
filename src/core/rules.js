export const rules = {
  required: [
    v => !!v || `Required!`
  ],
  required_phone_number: [
    v => !!v || `Required!`,
    v => /^[0-9]/.test(v) || 'No.telpon wajib diisi angka (misal: 081234567892)',
    v => v.length >= 9 || `No. telpon minimal 10 angka`,

  ],
  required_number: [
    v => !!v || `Required!`,
    v => /^[0-9]/.test(v) || 'Wajib diisi angka!',
  ],
  array_required: [
    v => !!v || 'Required!',
    v => v.length > 0 || 'Required!'
  ],
  citizen_identification_number: [
    v => !!v || 'Required!',
    v => /^[0-9]{16}$/.test(v) || 'Nomor Induk Kependudukan terdiri dari 16 digit'
  ],
  url: [
    v => !!v || i18n.t('required_field'),
    v => v.match(new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)) || i18n.t('input_must_be_url')
  ],
  required_email: [
    v => !!v || 'Required!', // Checks if the value is not empty
    v => /.+@.+\..+/.test(v) || 'Format email tidak valid!', // Checks for a basic email pattern
  ],
  number_range_0_100: [
    v => !!v || `Required!`,
    v => !isNaN(parseFloat(v)) && isFinite(v) || 'Input harus berupa angka!',
    v => v >= 0 || 'Nilai minimal adalah 0!',
    v => v <= 100 || 'Nilai maksimal adalah 100!',
  ],
}
